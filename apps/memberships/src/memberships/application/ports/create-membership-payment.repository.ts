import { MembershipPayment } from '../../domain/membershipPayment';

export abstract class CreateMembershipPaymentRepository {
  abstract save(
    membershipPayment: MembershipPayment,
  ): Promise<MembershipPayment>;
}
