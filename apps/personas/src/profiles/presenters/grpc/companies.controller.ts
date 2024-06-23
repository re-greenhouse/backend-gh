import {
  AddEmployeeDto,
  CompaniesServiceController,
  CompaniesServiceControllerMethods,
  Company,
  CreateCompanyDto,
  FindOneCompanyByProfileId,
} from '@app/common/types/personas';
import { Controller } from '@nestjs/common';
import { CompaniesService } from '../../application/companies.service';
import { CreateCompanyCommand } from '../../application/commands/create-company.command';
import { Profile } from '../../domain/profile';
import { ProfileService } from '../../application/profile.service';
import { AddEmployeeCommand } from '../../application/commands/add-employee.command';

@Controller()
@CompaniesServiceControllerMethods()
export class CompaniesController implements CompaniesServiceController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly profileService: ProfileService,
  ) {}

  async createCompany(request: CreateCompanyDto): Promise<Company> {
    const owner: Profile = await this.profileService.findByUserId(
      request.ownerId,
    );
    return this.companiesService.create(
      new CreateCompanyCommand(
        request.name,
        request.tin,
        request.logoUrl,
        owner,
      ),
    );
  }

  async findByProfileId(request: FindOneCompanyByProfileId): Promise<Company> {
    return this.companiesService.findOneByProfileId(request.profileId);
  }

  addEmployee(request: AddEmployeeDto): Promise<Profile> {
    return this.companiesService.addEmployee(
      new AddEmployeeCommand(request.companyId, request.profileId),
    );
  }
}
