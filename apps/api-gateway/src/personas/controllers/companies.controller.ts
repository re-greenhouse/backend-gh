import { Body, Controller, Post, Req } from '@nestjs/common';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Companies')
@Controller('api/v1/companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(@Req() req: Request, @Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(req['user']['sub'], createCompanyDto);
  }
}
