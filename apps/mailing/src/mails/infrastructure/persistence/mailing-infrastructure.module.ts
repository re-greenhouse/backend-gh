import { OrmMailingPersistenceModule } from './orm/orm-persistence.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [OrmMailingPersistenceModule],
  exports: [OrmMailingPersistenceModule],
})
export class MailingInfrastructureModule {}
