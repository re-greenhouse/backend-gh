import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { BenefitDto } from './benefit.dto';
import { Type } from 'class-transformer';

export class CreateMembershipLevelDto {
  @IsNotEmpty()
  name: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BenefitDto)
  benefits: BenefitDto[];
}
