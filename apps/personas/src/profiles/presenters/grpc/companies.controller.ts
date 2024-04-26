import {
  CompaniesServiceController,
  CompaniesServiceControllerMethods,
  Company,
  CreateCompanyDto,
} from '@app/common/types/personas';
import { Controller } from '@nestjs/common';
import { CompaniesService } from '../../application/companies.service';
import { CreateCompanyCommand } from '../../application/commands/create-company.command';
import { Profile } from '../../domain/profile';
import { ProfileService } from '../../application/profile.service';

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
}
