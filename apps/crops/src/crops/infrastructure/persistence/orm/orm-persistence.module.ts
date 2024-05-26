import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CropEntity } from './entities/crop.entity';
import { RecordEntity } from './entities/record.entity';
import { CreateCropRepository } from '../../../application/ports/create-crop.repository';
import { OrmCreateCropRepository } from './repositories/create-crop.repository';
import { CreateRecordRepository } from '../../../application/ports/create-record.repository';
import { OrmCreateRecordRepository } from './repositories/create-record.repository';
import { FindCropsRepository } from '../../../application/ports/find-crops.repository';
import { OrmFindCropsRepository } from './repositories/find-crops.repository';
import { FindRecordsRepository } from '../../../application/ports/find-records.repository';
import { OrmFindRecordsRepository } from './repositories/find-records.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CropEntity, RecordEntity])],
  providers: [
    {
      provide: CreateCropRepository,
      useClass: OrmCreateCropRepository,
    },
    {
      provide: CreateRecordRepository,
      useClass: OrmCreateRecordRepository,
    },
    {
      provide: FindCropsRepository,
      useClass: OrmFindCropsRepository,
    },
    {
      provide: FindRecordsRepository,
      useClass: OrmFindRecordsRepository,
    },
  ],
  exports: [
    CreateCropRepository,
    CreateRecordRepository,
    FindCropsRepository,
    FindRecordsRepository,
  ],
})
export class OrmCropsPersistenceModule {}
