import { CropEntity } from '../entities/crop.entity';
import { Crop } from '../../../../domain/crop';
import { CropPhase } from '../enums/phase.enum';
import { CropQuality } from '../enums/quality.enum';

export class CropMapper {
  static toDomain(cropEntity: CropEntity): Crop {
    const crop = new Crop(cropEntity.id, cropEntity.state);
    crop.startDate = new Date(cropEntity.startDate).toLocaleString();
    crop.author = cropEntity.author;
    crop.name = cropEntity.name;
    crop.phase = cropEntity.phase as CropPhase;
    crop.imageUrl = cropEntity.imageUrl;
    crop.quality = cropEntity.quality as CropQuality;

    return crop;
  }

  static toPersistence(crop: Crop): CropEntity {
    const cropEntity = new CropEntity();

    cropEntity.id = crop.id;
    cropEntity.name = crop.name;
    cropEntity.author = crop.author;
    cropEntity.state = crop.state;
    cropEntity.phase = crop.phase;
    cropEntity.imageUrl = crop.imageUrl;
    cropEntity.quality = crop.quality;

    return cropEntity;
  }
}
