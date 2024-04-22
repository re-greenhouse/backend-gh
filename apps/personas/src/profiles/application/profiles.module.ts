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

@Module({
  imports: [PersonasInfrastructureModule],
  exports: [],
  providers: [
    ProfileService,
    ProfileFactory,
    CreateProfileCommand,
    CreateProfileCommandHandler,
    CompaniesService,
    CompanyFactory,
    CreateCompanyCommand,
    CreateCompanyCommandHandler,
    GetProfileByUserIdQuery,
    GetProfileByIdQueryHandler,
  ],
  controllers: [ProfilesController, CompaniesController],
})
export class ProfilesModule {}
