import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyRepository } from '../../../../application/ports/create-company.repository';
import { Company } from '../../../../domain/company';
import { CompanyMapper } from '../mapper/company.mapper';

@Injectable()
export class OrmCreateCompanyRepository implements CreateCompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async save(company: Company): Promise<Company> {
    const persistenceModel: CompanyEntity =
      CompanyMapper.toPersistence(company);
    const newEntity: CompanyEntity =
      await this.companyRepository.save(persistenceModel);
    return CompanyMapper.toDomain(newEntity);
  }
}
