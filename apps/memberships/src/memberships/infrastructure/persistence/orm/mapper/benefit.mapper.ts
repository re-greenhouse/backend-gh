import { BenefitEntity } from '../entities/benefit.entity';
import { Benefit } from '../../../../domain/value_objects/benefit';
import { MembershipLevelMapper } from './membership-level.mapper';

export class BenefitMapper {
  static toDomain(benefitEntity: BenefitEntity): Benefit {
    const benefit = new Benefit(benefitEntity.id);
    benefit.name = benefitEntity.name;
    benefit.value = benefitEntity.value;
    benefit.membershipLevel = benefitEntity.membershipLevel
      ? MembershipLevelMapper.toDomain(benefitEntity.membershipLevel)
      : null;

    return benefit;
  }

  static toPersistence(benefit: Benefit): BenefitEntity {
    const benefitEntity = new BenefitEntity();

    benefitEntity.id = benefit.id;
    benefitEntity.name = benefit.name;
    benefitEntity.value = benefit.value;
    benefitEntity.membershipLevel = benefit.membershipLevel
      ? MembershipLevelMapper.toPersistence(benefit.membershipLevel)
      : null;

    return benefitEntity;
  }
}
