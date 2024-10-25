import { MembershipLevel } from '../../domain/membershipLevel';
import { MembershipPayment } from '../../domain/membershipPayment';
import { Company } from '@app/common/types/personas';

export class CreateMembershipCommand {
  constructor(
    public membershipLevel: MembershipLevel,
    public membershipPayment: MembershipPayment,
    public company: Company,
    public startDate: string,
    public endDate: string,
  ) {}
}
