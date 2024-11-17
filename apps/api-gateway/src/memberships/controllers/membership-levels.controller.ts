import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MembershipLevelsService } from '../services/membership-levels.service';
import { CreateMembershipLevelDto } from '../dto/create-membership-level.dto';

@ApiBearerAuth()
@ApiTags('MembershipLevels')
@Controller('api/v1/membership-levels')
export class MembershipLevelsController {
  constructor(
    private readonly membershipLevelsService: MembershipLevelsService,
  ) {}

  @Post()
  create(@Body() createMembershipLevelsDto: CreateMembershipLevelDto) {
    return this.membershipLevelsService.create(createMembershipLevelsDto);
  }

  @Get('/:name')
  findByName(@Param('name') name: string) {
    return this.membershipLevelsService.findByName(name);
  }
}
