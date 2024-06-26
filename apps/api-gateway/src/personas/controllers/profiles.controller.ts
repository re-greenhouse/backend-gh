import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ProfilesService } from '../services/profiles.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';

@ApiBearerAuth()
@ApiTags('Profiles')
@Controller('api/v1/profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(@Req() req: Request, @Body() createProfileDto: CreateProfileDto) {
    return this.profilesService.create({
      userId: req['user']['sub'],
      firstName: createProfileDto.firstName,
      lastName: createProfileDto.lastName,
      iconUrl: createProfileDto.iconUrl,
    });
  }

  @Get('/users/me')
  async findByUserMe(@Req() req: Request) {
    const profile = await firstValueFrom(
      this.profilesService.findByUserId(req['user']['sub']),
    );
    return { ...profile, username: req['user']['username'] };
  }

  @Get('/companies/:companyId')
  findByCompany(@Req() req: Request, @Param('companyId') companyId: string) {
    return this.profilesService.findByCompanyId(companyId);
  }
}
