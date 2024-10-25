import { MembershipEntity } from '../entities/membership.entity';
import { Membership } from '../../../../domain/membership';
import { MembershipPayment } from '../../../../domain/membershipPayment';
import { MembershipStatus } from '../enums/membership.status.enum';

//Pendiente añadir relaciones de membership con company y MembershipLevel
export class MembershipMapper {
  static toDomain(membershipEntity: MembershipEntity): Membership {
    const membership = new Membership(membershipEntity.id);
    membership.membershipPayment =
      membershipEntity.membershipPayment! as unknown as MembershipPayment;
    membership.startDate = membershipEntity.startDate;
    membership.endDate = membershipEntity.endDate;
    membership.status = membershipEntity.status! as MembershipStatus;

    return membership;
  }

  static toPersistence(membership: Membership): MembershipEntity {
    const membershipEntity = new MembershipEntity();
    membershipEntity.id = membership.id;
    membershipEntity.startDate = membership.startDate;
    membershipEntity.endDate = membership.endDate;
    membershipEntity.status = membership.status;
    //Add membershipPayment toPersistence

    return membershipEntity;
  }
}
