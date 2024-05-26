import { CropRecord } from '../../domain/record';

export abstract class CreateRecordRepository {
  abstract save(record: CropRecord): Promise<CropRecord>;
}
