import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FindCropsRepository } from '../ports/find-crops.repository';
import { RemoveCropRepository } from '../ports/remove-crop.repository';
import { Crop } from '../../domain/crop';
import { DeleteCropCommand } from './delete-crop.command';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@CommandHandler(DeleteCropCommand)
export class DeleteCropCommandHandler
  implements ICommandHandler<DeleteCropCommand>
{
  constructor(
    private readonly findCropsRepository: FindCropsRepository,
    private readonly removeCropsRepository: RemoveCropRepository,
  ) {}

  async execute(command: DeleteCropCommand): Promise<Crop> {
    const crop = await this.findCropsRepository.findById(command.id);
    if (crop === undefined) {
      throw new GrpcNotFoundException(`Crop ${command.id} doesn't exists. `);
    }
    return await this.removeCropsRepository.remove(crop);
  }
}
