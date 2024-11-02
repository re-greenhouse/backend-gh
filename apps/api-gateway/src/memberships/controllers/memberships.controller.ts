import { MembershipsService } from '../services/memberships.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMembershipDto } from '../dto/create-membership.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Memberships')
@Controller('api/v1/memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Post()
  create(@Body() createMembershipDto: CreateMembershipDto) {
    return this.membershipsService.create(createMembershipDto);
  }

  @Get(':companyId')
  findByCompany(@Param('companyId') companyId: string) {
    return this.membershipsService.findByCompany(companyId);
  }
}
