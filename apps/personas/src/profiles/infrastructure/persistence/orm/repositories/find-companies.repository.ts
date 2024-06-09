import { FindCompaniesRepository } from '../../../../application/ports/find-companies.repository';
import { Injectable } from '@nestjs/common';
import { Company } from '../../../../domain/company';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { CompanyMapper } from '../mapper/company.mapper';

@Injectable()
export class OrmFindCompaniesRepository implements FindCompaniesRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async existByTin(tin: string): Promise<boolean> {
    return await this.companyRepository.exists({ where: { tin: tin } });
  }

  async findAll(): Promise<Array<Company>> {
    const companyEntities: Array<CompanyEntity> =
      await this.companyRepository.find();
    return companyEntities.map(CompanyMapper.toDomain);
  }

  async findById(id: string): Promise<Company | undefined> {
    const companyEntity: CompanyEntity | null =
      await this.companyRepository.findOneBy({ id: id });
    return companyEntity ? CompanyMapper.toDomain(companyEntity) : undefined;
  }

  async findByProfileId(profileId: string): Promise<Company | undefined> {
    const companyEntity: CompanyEntity | null =
      await this.companyRepository.findOneBy({ employees: { id: profileId } });
    return companyEntity ? CompanyMapper.toDomain(companyEntity) : undefined;
  }
}
