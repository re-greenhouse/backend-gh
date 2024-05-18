import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCropCommand } from './commands/create-crop.command';
import { GetCropsQuery } from './queries/get-crops.query';
import { GetCropsByStateQuery } from './queries/get-crops-by-state.query';

@Injectable()
export class CropsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createCropCommand: CreateCropCommand) {
    return this.commandBus.execute(createCropCommand);
  }

  findAll() {
    return this.queryBus.execute(new GetCropsQuery());
  }

  findByState(state: boolean) {
    return this.queryBus.execute(new GetCropsByStateQuery(state));
  }
}
