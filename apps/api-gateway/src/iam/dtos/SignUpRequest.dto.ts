import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SignUpRequestDto {
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
}
