import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ProfilesService } from '../services/profiles.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { ProfileDto } from '../../iam/dtos/Profile.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';

@ApiBearerAuth()
@ApiTags('Profiles')
@Controller('api/v1/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User created',
    type: ProfileDto,
  })
  create(@Req() req: Request, @Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create({
      userId: req['user']['sub'],
      firstName: createProfileDto.firstName,
      lastName: createProfileDto.lastName,
      iconUrl: createProfileDto.iconUrl,
    });
  }

  @Get('/:profileId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find a profile by id',
    type: ProfileDto,
  })
  async findByProfileId(@Param('profileId') profileId: string) {
    return this.profilesService.findByProfileId(profileId);
  }

  @Get('/users/me')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Find user from bearer token from header',
    type: ProfileDto,
  })
  async findByUserMe(@Req() req: Request) {
    const profile = await firstValueFrom(
      this.profilesService.findByUserId(req['user']['sub']),
    );
    return { ...profile, username: req['user']['username'] };
  }

  @Get('/companies/:companyId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all the users from a company by id',
    type: Array<ProfileDto>,
  })
  findByCompany(@Req() req: Request, @Param('companyId') companyId: string) {
    return this.profilesService.findByCompanyId(companyId);
  }

  @Patch('/:profileId')
  updateById(@Param('profileId') profileId: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.updateByProfileId(profileId, updateProfileDto);
  }
}
