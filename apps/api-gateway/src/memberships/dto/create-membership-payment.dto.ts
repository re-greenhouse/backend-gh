import { IsNotEmpty } from 'class-validator';

export class CreateMembershipPaymentDto {
  @IsNotEmpty()
  membershipId: string;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  paymentDate: string;

  @IsNotEmpty()
  paymentMethod: string;
}
