import { MembershipLevelName } from '../infrastructure/persistence/orm/enums/membership.level.name.enum';
import { MembershipStatus } from '../infrastructure/persistence/orm/enums/membership.status.enum';

export class Membership {
  public membershipLevelName: MembershipLevelName;
  public companyId: string;
  public startDate: string;
  public endDate: string;
  public status: MembershipStatus;

  constructor(public id: string) {}
}
