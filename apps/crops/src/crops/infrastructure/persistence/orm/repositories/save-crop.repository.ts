import { SaveCropRepository } from '../../../../application/ports/save-crop.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CropEntity } from '../entities/crop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Crop } from '../../../../domain/crop';
import { CropMapper } from '../mapper/crop.mapper';

@Injectable()
export class OrmSaveCropRepository implements SaveCropRepository {
  constructor(
    @InjectRepository(CropEntity)
    private readonly cropRepository: Repository<CropEntity>,
  ) {}

  async save(crop: Crop): Promise<Crop> {
    const cropEntity = CropMapper.toPersistence(crop);
    const newCrop = await this.cropRepository.save(cropEntity);
    return CropMapper.toDomain(newCrop);
  }
}
