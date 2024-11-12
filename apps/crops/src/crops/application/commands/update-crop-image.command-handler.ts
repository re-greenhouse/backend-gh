import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCropImageCommand } from './update-crop-image.command';
import { FindCropsRepository } from '../ports/find-crops.repository';
import { SaveCropRepository } from '../ports/save-crop.repository';
import { Crop } from '../../domain/crop';
import {
  GrpcInvalidArgumentException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';
import { CropQuality } from '../../infrastructure/persistence/orm/enums/quality.enum';

@CommandHandler(UpdateCropImageCommand)
export class UpdateCropImageCommandHandler
  implements ICommandHandler<UpdateCropImageCommand>
{
  constructor(
    private readonly findCropsRepository: FindCropsRepository,
    private readonly saveCropRepository: SaveCropRepository,
  ) {}

  async execute(command: UpdateCropImageCommand): Promise<Crop> {
    const crop = await this.findCropsRepository.findById(command.id);
    if (crop === undefined) {
      throw new GrpcNotFoundException(`Crop '${command.id}' doesn't exist. `);
    }
    if (
      command.quality &&
      !Object.values(CropQuality).includes(command.quality as CropQuality)
    ) {
      throw new GrpcInvalidArgumentException(
        `${command.quality} is not a valid crop quality value.`,
      );
    }
    crop.imageUrl = command.imageUrl ?? crop.imageUrl;
    crop.quality = (command.quality as CropQuality) ?? crop.quality;
    return await this.saveCropRepository.save(crop);
  }
}
