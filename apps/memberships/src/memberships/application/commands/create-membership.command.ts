import { MembershipLevel } from '../../domain/membershipLevel';
import { MembershipPayment } from '../../domain/membershipPayment';

export class CreateMembershipCommand {
  constructor(
    public membershipLevel: MembershipLevel,
    public membershipPayment: MembershipPayment,
    public companyId: string,
    public startDate: string,
    public endDate: string,
  ) {}
}
