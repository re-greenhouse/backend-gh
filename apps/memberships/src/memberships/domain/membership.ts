import { MembershipStatus } from '../infrastructure/persistence/orm/enums/membership.status.enum';

export class Membership {
  public membershipLevelName: string;
  public companyId: string;
  public startDate: string;
  public endDate: string;
  public status: MembershipStatus;

  constructor(public id: string) {}
}
