import { Injectable } from '@nestjs/common';
import { Membership } from '../membership';
import { MembershipPayment } from '../membershipPayment';
import { randomUUID } from 'crypto';

@Injectable()
export class MembershipPaymentFactory {
  create(
    membership: Membership,
    amount: number,
    paymentDate: string,
    paymentMethod: string,
  ): MembershipPayment {
    const membershipPaymentId = randomUUID();
    const membershipPayment = new MembershipPayment(membershipPaymentId);

    membershipPayment.membership = membership;
    membershipPayment.amount = amount;
    membershipPayment.paymentDate = paymentDate;
    membershipPayment.paymentMethod = paymentMethod;

    return membershipPayment;
  }
}
