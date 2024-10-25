import { Membership } from './membership';

export class MembershipPayment {
  public membership: Membership;
  public amount: number;
  public paymentDate: string;
  public paymentMethod: string;
  constructor(public id: string) {}
}
