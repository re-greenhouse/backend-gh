import { SaveRecordRepository } from '../../../../application/ports/save-record.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordEntity } from '../entities/record.entity';
import { Repository } from 'typeorm';
import { CropRecord } from '../../../../domain/record';
import { RecordMapper } from '../mapper/record.mapper';

@Injectable()
export class OrmSaveRecordRepository implements SaveRecordRepository {
  constructor(
    @InjectRepository(RecordEntity)
    private readonly recordRepository: Repository<RecordEntity>,
  ) {}

  async save(cropRecord: CropRecord): Promise<CropRecord> {
    const recordEntity = RecordMapper.toPersistence(cropRecord);
    const newRecord = await this.recordRepository.save(recordEntity);
    return RecordMapper.toDomain(newRecord);
  }
}
