import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRecordCommand } from './commands/create-record.command';
import { GetRecordsQuery } from './queries/get-records.query';
import { GetRecordsByCropAndPhaseQuery } from './queries/get-records-by-crop-and-phase.query';
import { Crop } from '../domain/crop';

@Injectable()
export class RecordService {
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

  findAllByCropAndPhase(crop: Crop, phase: string) {
    return this.queryBus.execute(
      new GetRecordsByCropAndPhaseQuery(crop, phase),
    );
  }
}
