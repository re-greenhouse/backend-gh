import { IsNotEmpty } from 'class-validator';
import {
  MembershipLevel,
  MembershipPayment,
} from '@app/common/types/memberships';

export class CreateMembershipDto {
  @IsNotEmpty()
  membershipLevel: MembershipLevel;

  @IsNotEmpty()
  membershipPayment: MembershipPayment;

  @IsNotEmpty()
  companyId: string;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;
}
