import { Injectable } from '@nestjs/common';
import { MembershipPayment } from '../membershipPayment';
import { randomUUID } from 'crypto';

@Injectable()
export class MembershipPaymentFactory {
  create(
    membershipId: string,
    amount: number,
    paymentDate: string,
    paymentMethod: string,
  ): MembershipPayment {
    const membershipPaymentId = randomUUID();
    const membershipPayment = new MembershipPayment(membershipPaymentId);

    membershipPayment.membershipId = membershipId;
    membershipPayment.amount = amount;
    membershipPayment.paymentDate = paymentDate;
    membershipPayment.paymentMethod = paymentMethod;

    return membershipPayment;
  }
}
