import { RecordEntity } from '../entities/record.entity';
import { CropRecord } from '../../../../domain/record';
import { CropMapper } from './crop.mapper';

export class RecordMapper {
  static toDomain(recordEntity: RecordEntity): CropRecord {
    const record = new CropRecord(
      recordEntity.id,
      recordEntity.createdAt.toDateString(),
      recordEntity.updatedAt.toDateString(),
      CropMapper.toDomain(recordEntity.crop),
    );

    record.author = recordEntity.author;
    record.phase = recordEntity.phase;
    record.payload = recordEntity.payload; // Does this lose information?

    return record;
  }

  static toPersistence(record: CropRecord): RecordEntity {
    const recordEntity = new RecordEntity();

    recordEntity.id = record.id;
    recordEntity.createdAt = new Date(record.createdDate);
    recordEntity.updatedAt = new Date(record.updatedDate);
    recordEntity.author = record.author;
    recordEntity.phase = record.phase;
    recordEntity.payload = record.payload;
    recordEntity.crop = CropMapper.toPersistence(record.crop);

    return recordEntity;
  }
}
