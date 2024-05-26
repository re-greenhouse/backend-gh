import { Module } from '@nestjs/common';
import { OrmCropsPersistenceModule } from './persistence/orm/orm-persistence.module';

@Module({
  imports: [OrmCropsPersistenceModule],
  exports: [OrmCropsPersistenceModule],
})
export class CropsInfrastructureModule {}
