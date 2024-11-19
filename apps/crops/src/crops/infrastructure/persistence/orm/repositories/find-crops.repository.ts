import { FindCropsRepository } from '../../../../application/ports/find-crops.repository';
import { Repository } from 'typeorm';
import { CropEntity } from '../entities/crop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Crop } from '../../../../domain/crop';
import { CropMapper } from '../mapper/crop.mapper';

export class OrmFindCropsRepository implements FindCropsRepository {
  constructor(
    @InjectRepository(CropEntity)
    private readonly cropRepository: Repository<CropEntity>,
  ) {}

  async findAll(): Promise<Array<Crop>> {
    const cropsEntities: Array<CropEntity> = await this.cropRepository.find();
    return cropsEntities.map(CropMapper.toDomain);
  }

  async findById(id: string): Promise<Crop | undefined> {
    const cropEntity: CropEntity | null = await this.cropRepository.findOneBy({
      id: id,
    });
    return cropEntity ? CropMapper.toDomain(cropEntity) : undefined;
  }

  async findAllByState(isActive: boolean): Promise<Array<Crop>> {
    const cropsEntities: Array<CropEntity> = await this.cropRepository.findBy({
      state: isActive,
    });
    return cropsEntities.map(CropMapper.toDomain);
  }

  async findByCompanyId(companyId: string): Promise<Array<Crop>> {
    const cropsEntities: Array<CropEntity> = await this.cropRepository.findBy({
      companyId: companyId,
    });
    return cropsEntities.map(CropMapper.toDomain);
  }
}
