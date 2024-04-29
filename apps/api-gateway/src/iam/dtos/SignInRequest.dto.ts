import { IsString } from 'class-validator';
import { SignInDto } from '@app/common';

export class SignInRequestDto implements SignInDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
