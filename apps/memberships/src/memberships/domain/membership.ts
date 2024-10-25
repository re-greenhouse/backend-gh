import { Company } from '@app/common/types/personas';
import { MembershipLevel } from './membershipLevel';
import { MembershipPayment } from './membershipPayment';
import { MembershipStatus } from '../infrastructure/persistence/orm/enums/membership.status.enum';

export class Membership {
  public membershipLevel: MembershipLevel;
  public membershipPayment: MembershipPayment;
  public companyId: string;
  public startDate: string;
  public endDate: string;
  public status: MembershipStatus;

  constructor(public id: string) {}
}