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
import { RemoveCropRepository } from '../../../application/ports/remove-crop.repository';
import { OrmRemoveCropRepository } from './repositories/remove-crop.repository';
import { SaveCropRepository } from '../../../application/ports/save-crop.repository';
import { OrmSaveCropRepository } from './repositories/save-crop.repository';

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
    {
      provide: RemoveCropRepository,
      useClass: OrmRemoveCropRepository,
    },
    {
      provide: SaveCropRepository,
      useClass: OrmSaveCropRepository,
    },
  ],
  exports: [
    CreateCropRepository,
    CreateRecordRepository,
    FindCropsRepository,
    FindRecordsRepository,
    RemoveCropRepository,
    SaveCropRepository,
  ],
})
export class OrmCropsPersistenceModule {}
