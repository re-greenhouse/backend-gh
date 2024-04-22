import { Module } from '@nestjs/common';
import { OrmPersonasPersistenceModule } from './persistence/orm/orm-persistence.module';

@Module({
  imports: [OrmPersonasPersistenceModule],
  exports: [OrmPersonasPersistenceModule],
})
export class PersonasInfrastructureModule {}
