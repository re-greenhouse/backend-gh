import { ApiProperty } from '@nestjs/swagger';
import { ProfileDto } from './Profile.dto';
import { UserDto } from './User.dto';

export class SignUpResponseDto {
  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  profile: ProfileDto;
}
