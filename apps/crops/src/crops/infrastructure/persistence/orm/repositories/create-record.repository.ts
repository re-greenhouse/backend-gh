import { CreateRecordRepository } from '../../../../application/ports/create-record.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordEntity } from '../entities/record.entity';
import { Repository } from 'typeorm';
import { CropRecord } from '../../../../domain/record';
import { RecordMapper } from '../mapper/record.mapper';

@Injectable()
export class OrmCreateRecordRepository implements CreateRecordRepository {
  constructor(
    @InjectRepository(RecordEntity)
    private readonly recordRepository: Repository<RecordEntity>,
  ) {}

  async save(record: CropRecord): Promise<CropRecord> {
    const persistenceModel: RecordEntity = RecordMapper.toPersistence(record);

    const newEntity: RecordEntity =
      await this.recordRepository.save(persistenceModel);
    return RecordMapper.toDomain(newEntity);
  }
}
