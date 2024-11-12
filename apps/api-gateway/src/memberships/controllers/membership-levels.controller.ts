import { MembershipLevelsService } from '../services/membership-levels.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';

@ApiBearerAuth()
@ApiTags('Membership Levels')
@Controller('api/v1/membership_levels')
export class MembershipLevelsController {
  constructor(
    private readonly membershipLevelsService: MembershipLevelsService,
  ) {}

  @Get(':name')
  findByName(@Param('name') name: string) {
    return this.membershipLevelsService.findByName(name);
  }
}
