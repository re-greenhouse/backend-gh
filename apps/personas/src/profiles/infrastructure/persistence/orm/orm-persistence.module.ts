import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileEntity } from './entities/profile.entity';
import { OrmCreateProfileRepository } from './repositories/create-profile.repository';
import { CreateProfileRepository } from '../../../application/ports/create-profile.repository';
import { CreateCompanyRepository } from '../../../application/ports/create-company.repository';
import { OrmCreateCompanyRepository } from './repositories/create-company.repository';
import { CompanyEntity } from './entities/company.entity';
import { FindProfilesRepository } from '../../../application/ports/find-profiles.repository';
import { OrmFindProfilesRepository } from './repositories/find-profiles.repository';
import { FindCompaniesRepository } from '../../../application/ports/find-companies.repository';
import { OrmFindCompaniesRepository } from './repositories/find-companies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileEntity, CompanyEntity])],
  providers: [
    {
      provide: CreateProfileRepository,
      useClass: OrmCreateProfileRepository,
    },
    {
      provide: CreateCompanyRepository,
      useClass: OrmCreateCompanyRepository,
    },
    {
      provide: FindProfilesRepository,
      useClass: OrmFindProfilesRepository,
    },
    {
      provide: FindCompaniesRepository,
      useClass: OrmFindCompaniesRepository,
    },
  ],
  exports: [
    CreateProfileRepository,
    CreateCompanyRepository,
    FindProfilesRepository,
    FindCompaniesRepository,
  ],
})
export class OrmPersonasPersistenceModule {}
