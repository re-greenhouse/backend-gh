import { Module } from '@nestjs/common';
import { OrmMembershipsPersistenceModule } from './persistence/orm/orm-persistence.module';

@Module({
  imports: [OrmMembershipsPersistenceModule],
  exports: [OrmMembershipsPersistenceModule],
})
export class MembershipsInfrastructureModule {}
