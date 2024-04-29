import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Public } from '../../shared/decorators/public.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpRequestDto } from '../dtos/SignUpRequest.dto';
import { ProfileFacadeService } from '../../personas/facades/profile-facade.service';
import { firstValueFrom } from 'rxjs';
import { SignUpResponseDto } from '../dtos/SignUpResponse.dto';
import { SignInRequestDto } from '../dtos/SignInRequest.dto';
import { SignInResponseDto } from '../dtos/SignInResponse.dto';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly profileFacadeService: ProfileFacadeService,
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
    return { user: user, profile: profile };
  }
}
