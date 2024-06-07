import { CropRecord } from '../record';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Crop } from '../crop';
import { CropPhase } from '../../infrastructure/persistence/orm/enums/phase.enum';

@Injectable()
export class RecordFactory {
  create(
    author: string,
    phase: CropPhase,
    payload: string,
    crop: Crop,
  ): CropRecord {
    const recordId = randomUUID();
    const record = new CropRecord(recordId);

    record.crop = crop;
    record.author = author;
    record.phase = phase;
    record.payload = payload;
    record.crop = crop;

    return record;
  }
}
