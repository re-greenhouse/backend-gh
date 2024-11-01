import { forwardRef, Module } from '@nestjs/common';
import { ProfilesService } from './services/profiles.service';
import { ProfilesController } from './controllers/profiles.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PERSONAS_SERVICE } from './constants';
import { PERSONAS_PACKAGE_NAME } from '@app/common/types/personas';
import { join } from 'path';
import { CompaniesService } from './services/companies.service';
import { CompaniesController } from './controllers/companies.controller';
import { ProfileFacadeService } from './facades/profile-facade.service';
import { IamModule } from '../iam/iam.module';
import { CompanyFacadeService } from './facades/company-facade.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PERSONAS_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: PERSONAS_PACKAGE_NAME,
          protoPath: join(__dirname, '../personas.proto'),
          url: 'localhost:5001',
        },
      },
    ]),
    forwardRef(() => IamModule),
  ],
  controllers: [ProfilesController, CompaniesController],
  providers: [
    ProfilesService,
    CompaniesService,
    ProfileFacadeService,
    CompanyFacadeService,
  ],
  exports: [ProfileFacadeService, CompanyFacadeService],
})
export class PersonasModule {}
