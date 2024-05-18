import { Injectable } from '@nestjs/common';
import { Crop } from '../crop';
import { randomUUID } from 'crypto';

@Injectable()
export class CropFactory {
  create(name: string, author: string): Crop {
    const cropId = randomUUID();
    const crop: Crop = new Crop(cropId, Date.now().toString(), false);
    crop.name = name;
    crop.author = author;

    return crop;
  }
}
