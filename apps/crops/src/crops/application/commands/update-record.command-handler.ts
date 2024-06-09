import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateRecordCommand } from './update-record.command';
import { FindRecordsRepository } from '../ports/find-records.repository';
import { SaveRecordRepository } from '../ports/save-record.repository';
import { CropRecord } from '../../domain/record';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { Logger } from '@nestjs/common';

@CommandHandler(UpdateRecordCommand)
export class UpdateRecordCommandHandler
  implements ICommandHandler<UpdateRecordCommand>
{
  constructor(
    private readonly findRecordsRepository: FindRecordsRepository,
    private readonly saveRecordRepository: SaveRecordRepository,
  ) {}

  async execute(command: UpdateRecordCommand): Promise<CropRecord> {
    const cropRecord = await this.findRecordsRepository.findById(command.id);
    if (cropRecord === undefined) {
      throw new GrpcNotFoundException(`Record '${command.id}' doesn't exist.`);
    }
    cropRecord.payload = command.payload;
    return await this.saveRecordRepository.save(cropRecord);
  }
}
