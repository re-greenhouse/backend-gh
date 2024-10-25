import { Membership } from '../../domain/membership';

export class CreateMembershipPaymentCommand {
  constructor(
    public membership: Membership,
    public amount: number,
    public paymentDate: string,
    public paymentMethod: string,
  ) {}
}
