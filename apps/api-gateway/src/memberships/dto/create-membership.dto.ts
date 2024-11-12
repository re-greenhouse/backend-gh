import { IsNotEmpty } from 'class-validator';

export class CreateMembershipDto {
  @IsNotEmpty()
  membershipLevelName: string;

  @IsNotEmpty()
  companyId: string;

  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;
}
