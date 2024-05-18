import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatedRecordCommand } from './created-record.command';
import { RecordFactory } from '../../domain/factories/record.factory';
import { CreateRecordRepository } from '../ports/create-record.repository';
import { CropRecord } from '../../domain/record';

@CommandHandler(CreatedRecordCommand)
export class CreatedRecordCommandHandler
  implements ICommandHandler<CreatedRecordCommand>
{
  constructor(
    private readonly recordFactory: RecordFactory,
    private readonly createRecordRepository: CreateRecordRepository,
  ) {}

  async execute(command: CreatedRecordCommand): Promise<CropRecord> {
    const newRecord: CropRecord = this.recordFactory.create(
      command.author,
      command.phase,
      command.payload,
      command.crop,
    );

    return await this.createRecordRepository.save(newRecord);
  }
}
