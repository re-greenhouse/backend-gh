import { MembershipLevel } from '../../../../domain/membershipLevel';
import { MembershipLevelEntity } from '../entities/membership-level.entity';

export class MembershipLevelMapper {
  static toDomain(
    membershipLevelEntity: MembershipLevelEntity,
  ): MembershipLevel {
    const membershipLevel = new MembershipLevel(membershipLevelEntity.id);
    membershipLevel.name = membershipLevelEntity.name;

    return membershipLevel;
  }

  static toPersistence(
    membershipLevel: MembershipLevel,
  ): MembershipLevelEntity {
    const membershipLevelEntity = new MembershipLevelEntity();

    membershipLevelEntity.id = membershipLevel.id;
    membershipLevelEntity.name = membershipLevel.name;

    return membershipLevelEntity;
  }
}
