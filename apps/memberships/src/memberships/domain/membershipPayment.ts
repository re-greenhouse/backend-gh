export class MembershipPayment {
  public membershipId: string;
  public amount: number;
  public paymentDate: string;
  public paymentMethod: string;
  constructor(public id: string) {}
}
