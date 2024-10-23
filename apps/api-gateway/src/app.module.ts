import { Module } from '@nestjs/common';
import { IamModule } from './iam/iam.module';
import { PersonasModule } from './personas/personas.module';
import { SharedModule } from './shared/shared.module';
import { CropsModule } from './crops/crops.module';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [
    IamModule,
    PersonasModule,
    SharedModule,
    CropsModule,
    MailingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
