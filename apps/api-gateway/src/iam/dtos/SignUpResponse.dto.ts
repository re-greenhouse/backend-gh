import { User } from '@app/common';
import { Profile } from '@app/common/types/personas';
import { ApiProperty } from '@nestjs/swagger';

class UserObj implements User {
  id: string;
  username: string;
  role: string;
}

class ProfileObj implements Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  iconUrl: string;
  role: string;
}

export class SignUpResponseDto {
  @ApiProperty()
  user: UserObj;

  @ApiProperty()
  profile: ProfileObj;
}
