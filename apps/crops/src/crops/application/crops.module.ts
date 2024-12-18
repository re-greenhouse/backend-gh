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
import { UpdateCropCommand } from './commands/update-crop.command';
import { UpdateCropCommandHandler } from './commands/update-crop.command-handler';
import { DeleteCropCommand } from './commands/delete-crop.command';
import { DeleteCropCommandHandler } from './commands/delete-crop.command-handler';
import { UpdateRecordCommand } from './commands/update-record.command';
import { UpdateRecordCommandHandler } from './commands/update-record.command-handler';
import { DeleteRecordCommand } from './commands/delete-record.command';
import { DeleteRecordCommandHandler } from './commands/delete-record.command-handler';
import { GetRecordByIdQuery } from './queries/get-record-by-id.query';
import { GetRecordByIdQueryHandler } from './queries/get-record-by-id.query-handler';
import { UpdateCropImageCommand } from './commands/update-crop-image.command';
import { UpdateCropImageCommandHandler } from './commands/update-crop-image.command-handler';
import { GetCropByCompanyIdQuery } from './queries/get-crop-by-company-id.query';
import { GetCropByCompanyIdQueryHandler } from './queries/get-crop-by-company-id.query-handler';


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
    GetCropByCompanyIdQuery,
    GetCropByCompanyIdQueryHandler,
    UpdateCropCommand,
    UpdateCropCommandHandler,
    UpdateCropImageCommand,
    UpdateCropImageCommandHandler,
    DeleteCropCommand,
    DeleteCropCommandHandler,
    RecordsService,
    RecordFactory,
    CreateRecordCommand,
    CreateRecordCommandHandler,
    GetRecordsQuery,
    GetRecordsQueryHandler,
    GetRecordsByCropAndPhaseQuery,
    GetRecordsByCropAndPhaseQueryHandler,
    GetRecordByIdQuery,
    GetRecordByIdQueryHandler,
    UpdateRecordCommand,
    UpdateRecordCommandHandler,
    DeleteRecordCommand,
    DeleteRecordCommandHandler,
  ],
  controllers: [CropsController, RecordsController],
})
export class CropsModule {}
