,import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateRecordCommand } from './create-record.command';
import { RecordFactory } from '../../domain/factories/record.factory';
import { CreateRecordRepository } from '../ports/create-record.repository';
import { CropRecord } from '../../domain/record';
import { CropPhase } from '../../infrastructure/persistence/orm/enums/phase.enum';
import { GrpcInvalidArgumentException } from 'nestjs-grpc-exceptions';

@CommandHandler(CreateRecordCommand)
export class CreateRecordCommandHandler
  implements ICommandHandler<CreateRecordCommand>
{
  constructor(
    private readonly recordFactory: RecordFactory,
    private readonly createRecordRepository: CreateRecordRepository,
  ) {}

  async execute(command: CreateRecordCommand): Promise<CropRecord> {
    if (
      command.phase &&
      !Object.values(CropPhase).includes(command.phase as CropPhase)
    ) {
      throw new GrpcInvalidArgumentException(
        `${command.phase} is not a valid crop phase.`,
      );
    }
    const newRecord: CropRecord = this.recordFactory.create(
      command.author,
      command.phase as CropPhase,
      command.payload,
      command.crop,
    );

    return await this.createRecordRepository.save(newRecord);
  }
}
