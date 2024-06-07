import { RemoveCropRepository } from '../../../../application/ports/remove-crop.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CropEntity } from '../entities/crop.entity';
import { Repository } from 'typeorm';
import { Crop } from '../../../../domain/crop';
import { CropMapper } from '../mapper/crop.mapper';

@Injectable()
export class OrmRemoveCropRepository implements RemoveCropRepository {
  constructor(
    @InjectRepository(CropEntity)
    private readonly cropRepository: Repository<CropEntity>,
  ) {}

  async remove(crop: Crop): Promise<Crop> {
    const cropEntity = CropMapper.toPersistence(crop);
    await this.cropRepository.remove(cropEntity);
    return CropMapper.toDomain(cropEntity);
  }
}
