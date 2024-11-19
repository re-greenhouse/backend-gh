export class CreateMembershipPaymentCommand {
  constructor(
    public membershipId: string,
    public amount: number,
    public paymentDate: string,
    public paymentMethod: string,
  ) {}
}
