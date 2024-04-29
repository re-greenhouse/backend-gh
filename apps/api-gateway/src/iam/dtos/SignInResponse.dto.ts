import { ProfileDto } from './Profile.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInResponseDto {
  @IsString()
  token: string;

  @ApiProperty({ type: ProfileDto })
  profile: ProfileDto;
}
