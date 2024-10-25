import { MembershipPaymentEntity } from '../entities/membership-payment.entity';
import { MembershipPayment } from '../../../../domain/membershipPayment';
import { Membership } from '../../../../domain/membership';
import { MembershipMapper } from './membership.mapper';

export class MembershipPaymentMapper {
  static toDomain(
    membershipPaymentEntity: MembershipPaymentEntity,
  ): MembershipPayment {
    const membershipPayment = new MembershipPayment(membershipPaymentEntity.id);
    membershipPayment.amount = membershipPaymentEntity.amount;
    membershipPayment.paymentDate = membershipPaymentEntity.paymentDate;
    membershipPayment.paymentMethod = membershipPaymentEntity.paymentMethod;
    //Fix membership relations
    membershipPayment.membership =
      membershipPaymentEntity.membership! as unknown as Membership;

    return membershipPayment;
  }

  static toPersistence(
    membershipPayment: MembershipPayment,
  ): MembershipPaymentEntity {
    const membershipPaymentEntity = new MembershipPaymentEntity();
    membershipPaymentEntity.id = membershipPayment.id;
    membershipPaymentEntity.paymentDate = membershipPayment.paymentDate;
    membershipPaymentEntity.paymentMethod = membershipPayment.paymentMethod;
    membershipPaymentEntity.amount = membershipPayment.amount;
    membershipPaymentEntity.membership = MembershipMapper.toPersistence(
      membershipPayment.membership,
    );
    return membershipPaymentEntity;
  }
}
