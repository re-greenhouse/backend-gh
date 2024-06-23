import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Companies')
@Controller('api/v1/companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(
    @Req() req: Request,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    return this.companiesService.create(req['user']['sub'], createCompanyDto);
  }

  /*
    TODO: Take care that person B can't access person A data
     if person B is not the owner and doesn't have admin roles.
  */
  @Get()
  findByProfile(@Query('profileId') profileId: string) {
    return this.companiesService.findByProfileId(profileId);
  }
}
