import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCropCommand } from './update-crop.command';
import { FindCropsRepository } from '../ports/find-crops.repository';
import { SaveCropRepository } from '../ports/save-crop.repository';
import { Crop } from '../../domain/crop';
import {
  GrpcInvalidArgumentException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';
import { CropPhase } from '../../infrastructure/persistence/orm/enums/phase.enum';

@CommandHandler(UpdateCropCommand)
export class UpdateCropCommandHandler
  implements ICommandHandler<UpdateCropCommand>
{
  constructor(
    private readonly findCropsRepository: FindCropsRepository,
    private readonly saveCropRepository: SaveCropRepository,
  ) {}

  async execute(command: UpdateCropCommand): Promise<Crop> {
    const crop = await this.findCropsRepository.findById(command.id);
    if (crop === undefined) {
      throw new GrpcNotFoundException(`Crop '${command.id}' doesn't exist. `);
    }
    if (
      command.phase &&
      !Object.values(CropPhase).includes(command.phase as CropPhase)
    ) {
      throw new GrpcInvalidArgumentException(
        `${command.phase} is not a valid crop phase.`,
      );
    }
    crop.phase = (command.phase as CropPhase) ?? crop.phase;
    crop.state = command.state ?? crop.state;
    return await this.saveCropRepository.save(crop);
  }
}
