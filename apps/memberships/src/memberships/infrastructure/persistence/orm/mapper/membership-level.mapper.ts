import { MembershipLevel } from '../../../../domain/membershipLevel';
import { MembershipLevelEntity } from '../entities/membership-level.entity';
import { BenefitMapper } from './benefit.mapper';

export class MembershipLevelMapper {
  static toDomain(
    membershipLevelEntity: MembershipLevelEntity,
  ): MembershipLevel {
    const membershipLevel = new MembershipLevel(membershipLevelEntity.id);
    membershipLevel.name = membershipLevelEntity.name;
    membershipLevel.benefits = membershipLevelEntity.benefits.map((benefit) =>
      BenefitMapper.toDomain(benefit),
    );

    return membershipLevel;
  }

  static toPersistence(
    membershipLevel: MembershipLevel,
  ): MembershipLevelEntity {
    const membershipLevelEntity = new MembershipLevelEntity();

    membershipLevelEntity.id = membershipLevel.id;
    membershipLevelEntity.name = membershipLevel.name;
    membershipLevelEntity.benefits = membershipLevel.benefits.map((benefit) =>
      BenefitMapper.toPersistence(benefit),
    );

    return membershipLevelEntity;
  }
}
