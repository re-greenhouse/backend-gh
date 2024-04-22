import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tin: string;

  @IsNotEmpty()
  logoUrl: string;
}
