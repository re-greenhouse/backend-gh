import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpEnterpriseRequestDto {
  @IsString()
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  password: string;

  @IsOptional()
  invitationCode?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tin: string;
}
