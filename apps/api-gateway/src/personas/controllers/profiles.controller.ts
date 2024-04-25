import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ProfilesService } from '../services/profiles.service';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Controller('profiles')
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
