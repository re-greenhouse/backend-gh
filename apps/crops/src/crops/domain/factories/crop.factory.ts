import { Injectable } from '@nestjs/common';
import { Crop } from '../crop';
import { randomUUID } from 'crypto';
import { CropPhase } from '../../infrastructure/persistence/orm/enums/phase.enum';

@Injectable()
export class CropFactory {
  create(name: string, author: string, companyId: string): Crop {
    const cropId = randomUUID();
    const crop: Crop = new Crop(cropId, true);
    crop.name = name;
    crop.author = author;
    crop.companyId = companyId;
    crop.phase = CropPhase.Formula;

    return crop;
  }
}
