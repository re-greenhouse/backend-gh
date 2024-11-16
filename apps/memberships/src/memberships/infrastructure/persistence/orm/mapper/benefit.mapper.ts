import { BenefitEntity } from '../entities/benefit.entity';
import { Benefit } from '../../../../domain/value_objects/benefit';
import { MembershipLevelMapper } from './membership-level.mapper';

export class BenefitMapper {
  static toDomain(benefitEntity: BenefitEntity): Benefit {
    const benefit = new Benefit(benefitEntity.id);
    benefit.name = benefitEntity.name;
    benefit.value = benefitEntity.value;
    benefit.membershipLevel = MembershipLevelMapper.toDomain(
      benefitEntity.membershipLevel,
    );

    return benefit;
  }

  static toPersistence(benefit: Benefit): BenefitEntity {
    const benefitEntity = new BenefitEntity();
    benefitEntity.name = benefit.name;
    benefitEntity.value = benefit.value;
    benefitEntity.membershipLevel = MembershipLevelMapper.toPersistence(
      benefit.membershipLevel,
    );

    return benefitEntity;
  }
}
