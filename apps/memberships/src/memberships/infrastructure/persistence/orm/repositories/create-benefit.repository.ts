import { CreateBenefitRepository } from '../../../../application/ports/create-benefit.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BenefitEntity } from '../entities/benefit.entity';
import { Repository } from 'typeorm';
import { Benefit } from '../../../../domain/value_objects/benefit';
import { BenefitMapper } from '../mapper/benefit.mapper';

@Injectable()
export class OrmCreateBenefitRepository implements CreateBenefitRepository {
  constructor(
    @InjectRepository(BenefitEntity)
    private readonly benefitRepository: Repository<BenefitEntity>,
  ) {}

  async save(benefit: Benefit): Promise<Benefit> {
    const persistenceModel: BenefitEntity =
      BenefitMapper.toPersistence(benefit);
    const newEntity: BenefitEntity =
      await this.benefitRepository.save(persistenceModel);
    return BenefitMapper.toDomain(newEntity);
  }
}
