import { FindRecordsRepository } from '../../../../application/ports/find-records.repository';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Crop } from 'apps/crops/src/crops/domain/crop';
import { CropRecord } from 'apps/crops/src/crops/domain/record';
import { RecordEntity } from '../entities/record.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordMapper } from '../mapper/record.mapper';

@Injectable()
export class OrmFindRecordsRepository implements FindRecordsRepository {
  constructor(
    @InjectRepository(RecordEntity)
    private readonly recordRepository: Repository<RecordEntity>,
  ) {}

  async findAll(): Promise<Array<CropRecord>> {
    const recordEntities: Array<RecordEntity> =
      await this.recordRepository.find();
    return recordEntities.map(RecordMapper.toDomain);
  }

  async findByCropAndPhase(
    crop: Crop,
    phase: string,
  ): Promise<Array<CropRecord> | undefined> {
    const recordEntities: Array<RecordEntity> =
      await this.recordRepository.find({
        relations: ['crop'],
        where: {
          crop: { id: crop.id },
          phase: phase,
        },
      });
    return recordEntities
      ? recordEntities.map(RecordMapper.toDomain)
      : undefined;
  }

  async findById(id: string): Promise<CropRecord | undefined> {
    const recordEntity: RecordEntity | null =
      await this.recordRepository.findOne({
        relations: {
          crop: true,
        },
        where: {
          id: id,
        },
      });
    return recordEntity ? RecordMapper.toDomain(recordEntity) : undefined;
  }
}
