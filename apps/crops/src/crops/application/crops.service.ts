import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCropCommand } from './commands/create-crop.command';
import { GetCropsQuery } from './queries/get-crops.query';
import { GetCropsByStateQuery } from './queries/get-crops-by-state.query';
import { GetCropByIdQuery } from './queries/get-crop-by-id.query';
import { UpdateCropCommand } from './commands/update-crop.command';
import { Crop } from '../domain/crop';
import { DeleteCropCommand } from './commands/delete-crop.command';
import { UpdateCropImageCommand } from './commands/update-crop-image.command';

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

  update(updateCropCommand: UpdateCropCommand): Promise<Crop> {
    return this.commandBus.execute(updateCropCommand);
  }

  updateImage(updateCropImageCommand: UpdateCropImageCommand): Promise<Crop> {
    return this.commandBus.execute(updateCropImageCommand);
  }

  remove(deleteCropCommand: DeleteCropCommand): Promise<Crop> {
    return this.commandBus.execute(deleteCropCommand);
  }
}
