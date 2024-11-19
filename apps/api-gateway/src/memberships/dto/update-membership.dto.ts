import { IsOptional } from 'class-validator';

export class UpdateMembershipDto {
  @IsOptional()
  membershipLevelName: string;
}
