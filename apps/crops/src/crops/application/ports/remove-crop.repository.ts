import { Crop } from '../../domain/crop';

export abstract class RemoveCropRepository {
  abstract remove(crop: Crop): Promise<Crop>;
}
