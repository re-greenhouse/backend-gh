import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRecordCommand } from './create-record.command';
import { RecordFactory } from '../../domain/factories/record.factory';
import { CreateRecordRepository } from '../ports/create-record.repository';
import { CropRecord } from '../../domain/record';

@CommandHandler(CreateRecordCommand)
export class CreateRecordCommandHandler
  implements ICommandHandler<CreateRecordCommand>
{
  constructor(
    private readonly recordFactory: RecordFactory,
    private readonly createRecordRepository: CreateRecordRepository,
  ) {}

  async execute(command: CreateRecordCommand): Promise<CropRecord> {
    const newRecord: CropRecord = this.recordFactory.create(
      command.author,
      command.phase,
      command.payload,
      command.crop,
    );

    return await this.createRecordRepository.save(newRecord);
  }
}
