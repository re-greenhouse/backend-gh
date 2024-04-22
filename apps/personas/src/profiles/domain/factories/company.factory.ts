import { Company } from '../company';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class CompanyFactory {
  create(tin: string, name: string, logoUrl: string): Company {
    const companyId = randomUUID();

    const company: Company = new Company(companyId);
    company.tin = tin;
    company.name = name;
    company.logoUrl = logoUrl;

    return company;
  }
}
