import { CropRecord } from '../../domain/record';
import { Crop } from '../../domain/crop';

export abstract class FindRecordsRepository {
  abstract findAll(): Promise<Array<CropRecord>>;
  abstract findByCropAndPhase(
    crop: Crop,
    phase: string,
  ): Promise<Array<CropRecord> | undefined>;
  abstract findById(id: string): Promise<CropRecord | undefined>;
}
