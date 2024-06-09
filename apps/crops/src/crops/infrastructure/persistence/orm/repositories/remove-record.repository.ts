import { RemoveRecordRepository } from '../../../../application/ports/remove-record.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RecordEntity } from '../entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CropRecord } from '../../../../domain/record';
import { RecordMapper } from '../mapper/record.mapper';

@Injectable()
export class OrmRemoveRecordRepository implements RemoveRecordRepository {
  constructor(
    @InjectRepository(RecordEntity)
    private readonly recordRepository: Repository<RecordEntity>,
  ) {}

  async remove(cropRecord: CropRecord): Promise<CropRecord> {
    const recordEntity = RecordMapper.toPersistence(cropRecord);
    await this.recordRepository.remove(recordEntity);
    return RecordMapper.toDomain(recordEntity);
  }
}
