import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCropCommand } from './create-crop.command';
import { CropFactory } from '../../domain/factories/crop.factory';
import { CreateCropRepository } from '../ports/create-crop.repository';
import { Crop } from '../../domain/crop';

@CommandHandler(CreateCropCommand)
export class CreateCropCommandHandler
  implements ICommandHandler<CreateCropCommand>
{
  constructor(
    private readonly cropFactory: CropFactory,
    private readonly createCropRepository: CreateCropRepository,
  ) {}

  async execute(command: CreateCropCommand): Promise<Crop> {
    const newCrop: Crop = this.cropFactory.create(command.name, command.author);
    return await this.createCropRepository.save(newCrop);
  }
}
