import { RecordEntity } from '../entities/record.entity';
import { CropRecord } from '../../../../domain/record';
import { CropMapper } from './crop.mapper';
import { CropPhase } from '../enums/phase.enum';

export class RecordMapper {
  static toDomain(recordEntity: RecordEntity): CropRecord {
    const dateOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timezone: 'America/Chicago',
    } as const;
    const record = new CropRecord(recordEntity.id);
    record.createdDate = new Intl.DateTimeFormat('es', dateOptions)
      .format(recordEntity.createdAt)
      .toString();
    record.updatedDate = new Intl.DateTimeFormat('es', dateOptions)
      .format(recordEntity.updatedAt)
      .toString();
    record.author = recordEntity.author;
    record.phase = recordEntity.phase as CropPhase;
    record.payload = recordEntity.payload;

    return record;
  }

  static toPersistence(record: CropRecord): RecordEntity {
    const recordEntity = new RecordEntity();

    recordEntity.id = record.id;
    recordEntity.author = record.author;
    recordEntity.phase = record.phase;
    recordEntity.payload = record.payload;
    recordEntity.crop = CropMapper.toPersistence(record.crop);

    return recordEntity;
  }
}
