import { CropEntity } from '../entities/crop.entity';
import { Crop } from '../../../../domain/crop';
import { CropPhase } from '../enums/phase.enum';

export class CropMapper {
  static toDomain(cropEntity: CropEntity): Crop {
    const dateOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timezone: 'America/Chicago',
    } as const;
    const crop = new Crop(cropEntity.id, cropEntity.state);
    const newDate = new Date(cropEntity.startDate);
    crop.startDate = new Intl.DateTimeFormat('en-US', dateOptions).format(
      newDate,
    );
    crop.author = cropEntity.author;
    crop.name = cropEntity.name;
    crop.phase = cropEntity.phase as CropPhase;

    return crop;
  }

  static toPersistence(crop: Crop): CropEntity {
    const cropEntity = new CropEntity();

    cropEntity.id = crop.id;
    cropEntity.name = crop.name;
    cropEntity.author = crop.author;
    cropEntity.state = crop.state;
    cropEntity.phase = crop.phase;

    return cropEntity;
  }
}
