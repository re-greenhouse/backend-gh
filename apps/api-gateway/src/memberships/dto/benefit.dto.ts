import { IsNotEmpty } from 'class-validator';

export class BenefitDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  value: number;
}
