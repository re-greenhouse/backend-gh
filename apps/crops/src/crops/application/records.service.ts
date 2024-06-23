import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRecordCommand } from './commands/create-record.command';
import { GetRecordsQuery } from './queries/get-records.query';
import { GetRecordsByCropAndPhaseQuery } from './queries/get-records-by-crop-and-phase.query';
import { Crop } from '../domain/crop';
import { UpdateRecordCommand } from './commands/update-record.command';
import { CropRecord } from '../domain/record';
import { DeleteRecordCommand } from './commands/delete-record.command';
import { GetRecordByIdQuery } from './queries/get-record-by-id.query';

@Injectable()
export class RecordsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createRecordCommand: CreateRecordCommand) {
    return this.commandBus.execute(createRecordCommand);
  }

  findAll() {
    return this.queryBus.execute(new GetRecordsQuery());
  }

  findById(id: string) {
    return this.queryBus.execute(new GetRecordByIdQuery(id));
  }

  findAllByCropAndPhase(cropId: string, phase: string) {
    return this.queryBus.execute(
      new GetRecordsByCropAndPhaseQuery(cropId, phase),
    );
  }

  update(updateRecordCommand: UpdateRecordCommand): Promise<CropRecord> {
    return this.commandBus.execute(updateRecordCommand);
  }

  remove(deleteRecordCommand: DeleteRecordCommand): Promise<CropRecord> {
    return this.commandBus.execute(deleteRecordCommand);
  }
}
