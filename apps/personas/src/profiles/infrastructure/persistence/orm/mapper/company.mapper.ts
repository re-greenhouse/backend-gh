import { CompanyEntity } from '../entities/company.entity';
import { Company } from '../../../../domain/company';

export class CompanyMapper {
  static toDomain(companyEntity: CompanyEntity): Company {
    const company = new Company(companyEntity.id);

    company.name = companyEntity.name;
    company.tin = companyEntity.tin;
    company.logoUrl = companyEntity.logoUrl;

    return company;
  }

  static toPersistence(company: Company): CompanyEntity {
    const companyEntity = new CompanyEntity();

    companyEntity.id = company.id;
    companyEntity.name = company.name;
    companyEntity.tin = company.tin;
    companyEntity.logoUrl = company.logoUrl;

    return companyEntity;
  }
}
