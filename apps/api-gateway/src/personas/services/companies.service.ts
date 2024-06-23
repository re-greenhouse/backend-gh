import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PERSONAS_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CompaniesServiceClient,
  COMPANIES_SERVICE_NAME,
} from '@app/common/types/personas';
import { CreateCompanyDto } from '../dto/create-company.dto';

@Injectable()
export class CompaniesService implements OnModuleInit {
  private companiesService: CompaniesServiceClient;

  constructor(@Inject(PERSONAS_SERVICE) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.companiesService = this.client.getService<CompaniesServiceClient>(
      COMPANIES_SERVICE_NAME,
    );
  }

  create(ownerId: string, createCompanyDto: CreateCompanyDto) {
    return this.companiesService.createCompany({
      name: createCompanyDto.name,
      logoUrl: createCompanyDto.logoUrl,
      tin: createCompanyDto.tin,
      ownerId: ownerId,
    });
  }

  findByProfileId(profileId: string) {
    return this.companiesService.findByProfileId({
      profileId: profileId,
    });
  }

  addEmployee(companyId: string, employeeProfileId: string) {
    return this.companiesService.addEmployee({
      companyId: companyId,
      profileId: employeeProfileId,
    });
  }
}
