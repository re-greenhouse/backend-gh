import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Public } from '../../shared/decorators/public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpRequestDto } from '../dtos/SignUpRequest.dto';
import { ProfileFacadeService } from '../../personas/facades/profile-facade.service';
import { firstValueFrom } from 'rxjs';
import { SignUpResponseDto } from '../dtos/SignUpResponse.dto';
import { SignInRequestDto } from '../dtos/SignInRequest.dto';
import { SignInResponseDto } from '../dtos/SignInResponse.dto';
import { MailFacadeService } from '../../mailing/facade/mail-facade.service';
import { SignUpEnterpriseRequestDto } from '../dtos/SignUpEnterpriseRequest.dto';
import { CompanyFacadeService } from '../../personas/facades/company-facade.service';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly profileFacadeService: ProfileFacadeService,
    private readonly mailFacadeService: MailFacadeService,
    private readonly companyFacadeService: CompanyFacadeService,
  ) {}

  @Public()
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User signed token',
    type: SignInResponseDto,
  })
  async signIn(
    @Body() signInDto: SignInRequestDto,
  ): Promise<SignInResponseDto> {
    const authenticatedUser = await firstValueFrom(
      this.authService.signIn(signInDto),
    );
    const profile = await firstValueFrom(
      this.profileFacadeService.findByUserId(authenticatedUser.userId),
    );
    return { token: authenticatedUser.token, profile: profile };
  }

  @Public()
  @Post('sign-up')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created user and profile',
    type: SignUpResponseDto,
  })
  async signUp(
    @Body() signUpDto: SignUpRequestDto,
  ): Promise<SignUpResponseDto> {
    const user = await firstValueFrom(this.authService.signUp(signUpDto));
    const profile = await firstValueFrom(
      this.profileFacadeService.create({
        userId: user.id,
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
        iconUrl:
          'https://publicdomainvectors.org/tn_img/abstract-user-flat-4.webp',
      }),
    );
    this.mailFacadeService.sendMail({
      email: user.email,
      eventName: 'user.registered',
      payloadVariables: [
        { variable: 'firstName', value: profile.firstName },
        { variable: 'lastName', value: profile.lastName },
        { variable: 'username', value: user.username },
        { variable: 'email', value: user.email },
      ],
    });
    return { user: user, profile: profile };
  }

  @Public()
  @Post('sign-up-enterprise')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created user, profile with company',
    type: SignUpResponseDto,
  })
  async signUpEnterprise(
    @Body() signUpDto: SignUpEnterpriseRequestDto,
  ): Promise<SignUpResponseDto> {
    const existByTin = await firstValueFrom(
      this.companyFacadeService.existByTin(signUpDto.tin),
    );

    if (existByTin.exist) {
      throw new BadRequestException(
        'A company with the same tin already exists',
      );
    }

    const user = await firstValueFrom(this.authService.signUp(signUpDto));
    const profile = await firstValueFrom(
      this.profileFacadeService.create({
        userId: user.id,
        firstName: signUpDto.firstName,
        lastName: signUpDto.lastName,
        iconUrl:
          'https://publicdomainvectors.org/tn_img/abstract-user-flat-4.webp',
      }),
    );

    this.companyFacadeService.createCompany(user.id, {
      tin: signUpDto.tin,
      name: signUpDto.name,
      logoUrl:
        'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2018/02/toad.jpeg?tf=1200x1200',
    });

    this.mailFacadeService.sendMail({
      email: user.email,
      eventName: 'user.registered',
      payloadVariables: [
        { variable: 'firstName', value: profile.firstName },
        { variable: 'lastName', value: profile.lastName },
        { variable: 'username', value: user.username },
        { variable: 'email', value: user.email },
      ],
    });

    return { user: user, profile: profile };
  }
}
