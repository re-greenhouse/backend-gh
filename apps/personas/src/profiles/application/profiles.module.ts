import { Module } from '@nestjs/common';
import { ProfilesController } from '../presenters/grpc/profiles.controller';
import { CreateProfileCommandHandler } from './commands/create-profile.command-handler';
import { CreateProfileCommand } from './commands/create-profile.command';
import { PersonasInfrastructureModule } from '../infrastructure/personas-infrastructure.module';
import { CompanyFactory } from '../domain/factories/company.factory';
import { ProfileFactory } from '../domain/factories/profile.factory';
import { ProfileService } from './profile.service';
import { CreateCompanyCommand } from './commands/create-company.command';
import { CreateCompanyCommandHandler } from './commands/create-company.command-handler';
import { CompaniesController } from '../presenters/grpc/companies.controller';
import { CompaniesService } from './companies.service';
import { GetProfileByUserIdQuery } from './queries/get-profile-by-user-id.query';
import { GetProfileByIdQueryHandler } from './queries/get-profile-by-id.query-handler';
import { GetProfilesByCompanyIdQuery } from './queries/get-profiles-by-company-id.query';
import { GetProfilesByCompanyIdQueryHandler } from './queries/get-profiles-by-company-id.query-handler';
import { GetCompanyByProfileIdQuery } from './queries/get-company-by-profile-id.query';
import { GetCompanyByProfileIdQueryHandler } from './queries/get-company-by-profile-id.query-handler';
import { AddEmployeeCommand } from './commands/add-employee.command';
import { AddEmployeeCommandHandler } from './commands/add-employee.command-handler';
import { UpdateCompanyCommandHandler } from './commands/update-company.command-handler';
import { UpdateCompanyCommand } from './commands/update-company.command';
import { UpdateProfileCommand } from './commands/update-profile.command';
import { UpdateProfileCommandHandler } from './commands/update-profile.command-handler';
import { ExistCompanyWithTinQuery } from './queries/exist-company-with-tin.query';
import { ExistCompanyWithTinQueryHandler } from './queries/exist-company-with-tin.query-handler';

@Module({
  imports: [PersonasInfrastructureModule],
  exports: [],
  providers: [
    ProfileService,
    ProfileFactory,
    CreateProfileCommand,
    CreateProfileCommandHandler,
    UpdateProfileCommand,
    UpdateProfileCommandHandler,
    UpdateCompanyCommand,
    UpdateCompanyCommandHandler,
    CompaniesService,
    CompanyFactory,
    AddEmployeeCommand,
    AddEmployeeCommandHandler,
    CreateCompanyCommand,
    CreateCompanyCommandHandler,
    ExistCompanyWithTinQuery,
    ExistCompanyWithTinQueryHandler,
    GetProfileByUserIdQuery,
    GetProfileByIdQueryHandler,
    GetProfilesByCompanyIdQuery,
    GetProfilesByCompanyIdQueryHandler,
    GetCompanyByProfileIdQuery,
    GetCompanyByProfileIdQueryHandler,
  ],
  controllers: [ProfilesController, CompaniesController],
})
export class ProfilesModule {}
