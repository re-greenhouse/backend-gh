import { CropEntity } from '../entities/crop.entity';
import { Crop } from '../../../../domain/crop';

export class CropMapper {
  static toDomain(cropEntity: CropEntity): Crop {
    const crop = new Crop(
      cropEntity.id,
      cropEntity.createdAt,
      cropEntity.state,
    );

    crop.author = cropEntity.author;
    crop.name = cropEntity.name;
    return crop;
  }

  static toPersistence(crop: Crop): CropEntity {
    const cropEntity = new CropEntity();

    cropEntity.id = crop.id;
    cropEntity.name = crop.name;
    cropEntity.author = crop.author;
    /* cropEntity.createdAt = crop.createdDate; */
    cropEntity.state = crop.state;

    return cropEntity;
  }
}
