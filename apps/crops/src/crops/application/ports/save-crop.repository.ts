import { Crop } from '../../domain/crop';

export abstract class SaveCropRepository {
  abstract save(crop: Crop): Promise<Crop>;
}
