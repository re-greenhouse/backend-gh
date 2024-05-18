import { Crop } from 'apps/crops/src/crops/domain/crop';
import { CreateCropRepository } from '../../../../application/ports/create-crop.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CropEntity } from '../entities/crop.entity';
import { Repository } from 'typeorm';
import { CropMapper } from '../mapper/crop.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrmCreateCropRepository implements CreateCropRepository {
  constructor(
    @InjectRepository(CropEntity)
    private readonly cropRepository: Repository<CropEntity>,
  ) {}

  async save(crop: Crop): Promise<Crop> {
    const persistenceModel: CropEntity = CropMapper.toPersistence(crop);
    const newEntity: CropEntity =
      await this.cropRepository.save(persistenceModel);
    return CropMapper.toDomain(newEntity);
  }
}
