import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCropCommand } from './commands/create-crop.command';
import { GetCropsQuery } from './queries/get-crops.query';
import { GetCropsByStateQuery } from './queries/get-crops-by-state.query';
import { GetCropByIdQuery } from './queries/get-crop-by-id.query';

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

  findById(id: string) {
    return this.queryBus.execute(new GetCropByIdQuery(id));
  }

  findByState(state: boolean) {
    return this.queryBus.execute(new GetCropsByStateQuery(state));
  }
}
