import { Crop } from '../../domain/crop';

export abstract class CreateCropRepository {
  abstract save(crop: Crop): Promise<Crop>;
}
