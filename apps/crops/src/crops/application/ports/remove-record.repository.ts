import { CropRecord } from '../../domain/record';

export abstract class RemoveRecordRepository {
  abstract remove(record: CropRecord): Promise<CropRecord>;
}
