import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRecordCommand } from './delete-record.command';
import { FindRecordsRepository } from '../ports/find-records.repository';
import { RemoveRecordRepository } from '../ports/remove-record.repository';
import { CropRecord } from '../../domain/record';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@CommandHandler(DeleteRecordCommand)
export class DeleteRecordCommandHandler
  implements ICommandHandler<DeleteRecordCommand>
{
  constructor(
    private readonly findRecordsRepository: FindRecordsRepository,
    private readonly removeRecordsRepository: RemoveRecordRepository,
  ) {}

  async execute(command: DeleteRecordCommand): Promise<CropRecord> {
    const cropRecord = await this.findRecordsRepository.findById(command.id);
    if (cropRecord === undefined) {
      throw new GrpcNotFoundException(`Record '${command.id}' doesn't exist.`);
    }
    return await this.removeRecordsRepository.remove(cropRecord);
  }
}
