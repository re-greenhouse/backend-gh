import { User } from '@app/common';

export class UserDto implements User {
  id: string;
  username: string;
  role: string;
  email: string;
}
