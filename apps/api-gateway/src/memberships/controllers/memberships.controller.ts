import { MembershipsService } from '../services/memberships.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateMembershipDto } from '../dto/create-membership.dto';
import { UpdateMembershipDto } from '../dto/update-membership.dto';

@ApiBearerAuth()
@ApiTags('Memberships')
@Controller('api/v1/memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Post()
  create(@Body() createMembershipDto: CreateMembershipDto) {
    return this.membershipsService.create(createMembershipDto);
  }

  @Get('/:companyId')
  findByCompanyId(@Param('companyId') companyId: string) {
    return this.membershipsService.findByCompanyId(companyId);
  }

  @Patch(':id')
  updateLevel(
    @Param('id') id: string,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ) {
    return this.membershipsService.update(id, updateMembershipDto);
  }
}
