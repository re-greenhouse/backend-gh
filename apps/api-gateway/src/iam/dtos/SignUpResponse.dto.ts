import { ApiProperty } from '@nestjs/swagger';
import { ProfileDto } from './Profile.dto';
import { UserDto } from './User.dto';

export class SignUpResponseDto {
  @ApiProperty({ type: UserDto })
  user: UserDto;

  @ApiProperty({ type: ProfileDto })
  profile: ProfileDto;
}
