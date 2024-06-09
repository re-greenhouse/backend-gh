import { CropRecord } from '../../domain/record';

export abstract class SaveRecordRepository {
  abstract save(record: CropRecord): Promise<CropRecord>;
}
