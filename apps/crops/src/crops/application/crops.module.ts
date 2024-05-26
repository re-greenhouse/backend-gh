import { Module } from '@nestjs/common';
import { CropsInfrastructureModule } from '../infrastructure/crops-infrastructure.module';
import { CropsService } from './crops.service';
import { CropFactory } from '../domain/factories/crop.factory';
import { CreateCropCommand } from './commands/create-crop.command';
import { CreateCropCommandHandler } from './commands/create-crop.command-handler';
import { GetCropsQuery } from './queries/get-crops.query';
import { GetCropsQueryHandler } from './queries/get-crops.query-handler';
import { GetCropByIdQuery } from './queries/get-crop-by-id.query';
import { GetCropByIdQueryHandler } from './queries/get-crop-by-id.query-handler';
import { GetCropsByStateQuery } from './queries/get-crops-by-state.query';
import { GetCropsByStateQueryHandler } from './queries/get-crops-by-state.query-handler';
import { RecordsService } from './records.service';
import { RecordFactory } from '../domain/factories/record.factory';
import { CreateRecordCommand } from './commands/create-record.command';
import { CreateRecordCommandHandler } from './commands/create-record.command-handler';
import { GetRecordsQuery } from './queries/get-records.query';
import { GetRecordsQueryHandler } from './queries/get-records.query-handler';
import { GetRecordsByCropAndPhaseQuery } from './queries/get-records-by-crop-and-phase.query';
import { GetRecordsByCropAndPhaseQueryHandler } from './queries/get-records-by-crop-and-phase.query-handler';
import { CropsController } from '../presenters/grpc/crops.controller';
import { RecordsController } from '../presenters/grpc/records.controller';

@Module({
  imports: [CropsInfrastructureModule],
  exports: [],
  providers: [
    CropsService,
    CropFactory,
    CreateCropCommand,
    CreateCropCommandHandler,
    GetCropsQuery,
    GetCropsQueryHandler,
    GetCropByIdQuery,
    GetCropByIdQueryHandler,
    GetCropsByStateQuery,
    GetCropsByStateQueryHandler,
    RecordsService,
    RecordFactory,
    CreateRecordCommand,
    CreateRecordCommandHandler,
    GetRecordsQuery,
    GetRecordsQueryHandler,
    GetRecordsByCropAndPhaseQuery,
    GetRecordsByCropAndPhaseQueryHandler,
  ],
  controllers: [CropsController, RecordsController],
})
export class CropsModule {}
