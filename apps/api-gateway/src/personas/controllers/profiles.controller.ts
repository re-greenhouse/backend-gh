import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ProfilesService } from '../services/profiles.service';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

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
  findByUserMe(@Req() req: Request) {
    return this.profilesService.findByUserId(req['user']['sub']);
  }
}
