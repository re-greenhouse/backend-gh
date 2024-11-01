import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  COMPANIES_SERVICE_NAME,
  CompaniesServiceClient,
} from '@app/common/types/personas';
import { PERSONAS_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateCompanyDto } from '../dto/create-company.dto';

@Injectable()
export class CompanyFacadeService implements OnModuleInit {
  private companiesService: CompaniesServiceClient;

  constructor(@Inject(PERSONAS_SERVICE) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.companiesService = this.client.getService<CompaniesServiceClient>(
      COMPANIES_SERVICE_NAME,
    );
  }

  existByTin(tin: string) {
    return this.companiesService.existByTin({ tin: tin });
  }

  createCompany(ownerId: string, createCompanyDto: CreateCompanyDto) {
    return this.companiesService.createCompany({
      ownerId: ownerId,
      ...createCompanyDto,
    });
  }
}
