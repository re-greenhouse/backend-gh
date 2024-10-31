import { MembershipLevel } from './membershipLevel';
import { MembershipStatus } from '../infrastructure/persistence/orm/enums/membership.status.enum';

export class Membership {
  public membershipLevel: MembershipLevel;
  public companyId: string;
  public startDate: string;
  public endDate: string;
  public status: MembershipStatus;

  constructor(public id: string) {}
}
