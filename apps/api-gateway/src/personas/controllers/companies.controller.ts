import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CompaniesService } from '../services/companies.service';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AddEmployeeDto } from '../dto/add-employee.dto';
import { ProfilesService } from '../services/profiles.service';
import { firstValueFrom } from 'rxjs';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@ApiBearerAuth()
@ApiTags('Companies')
@Controller('api/v1/companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly profilesService: ProfilesService,
  ) {}

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

  @Post('employees')
  async addEmployee(
    @Req() req: Request,
    @Body() addEmployeeDto: AddEmployeeDto,
  ) {
    const profile = await firstValueFrom(
      this.profilesService.findByUserId(req['user']['sub']),
    );
    const company = await firstValueFrom(
      this.companiesService.findByProfileId(profile.id),
    );
    return this.companiesService.addEmployee(
      company.id,
      addEmployeeDto.employeeProfileId,
      addEmployeeDto.isAdmin,
    );
  }

  @Patch(':companyId')
  async updateCompany(
    @Param('companyId') companyId: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(companyId, updateCompanyDto);
  }
}
