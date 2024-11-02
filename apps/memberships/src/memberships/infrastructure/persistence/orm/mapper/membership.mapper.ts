import { MembershipEntity } from '../entities/membership.entity';
import { Membership } from '../../../../domain/membership';
import { MembershipStatus } from '../enums/membership.status.enum';

//Pendiente añadir relaciones de membership con company y MembershipLevel
export class MembershipMapper {
  static toDomain(membershipEntity: MembershipEntity): Membership {
    const membership = new Membership(membershipEntity.id);
    membership.membershipLevelName = membershipEntity.membershipLevelName;
    membership.companyId = membershipEntity.companyId;
    membership.startDate = membershipEntity.startDate;
    membership.endDate = membershipEntity.endDate;
    membership.status = membershipEntity.status! as MembershipStatus;

    return membership;
  }

  static toPersistence(membership: Membership): MembershipEntity {
    const membershipEntity = new MembershipEntity();
    membershipEntity.id = membership.id;
    membershipEntity.membershipLevelName = membership.membershipLevelName;
    membershipEntity.companyId = membership.companyId;
    membershipEntity.startDate = membership.startDate;
    membershipEntity.endDate = membership.endDate;
    membershipEntity.status = membership.status;

    return membershipEntity;
  }
}
