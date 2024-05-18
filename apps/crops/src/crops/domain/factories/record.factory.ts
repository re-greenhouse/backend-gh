import { CropRecord } from '../record';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Crop } from '../crop';

@Injectable()
export class RecordFactory {
  create(
    cropId: string,
    author: string,
    phase: string,
    payload: Record<string, any>,
    crop: Crop,
  ): Record {
    const recordId = randomUUID();
    const record = new CropRecord(recordId, Date.now(), Date.now());

    record.cropId = cropId;
    record.author = author;
    record.phase = phase;
    record.payload = payload;
    record.crop = crop;

    return record;
  }
}
