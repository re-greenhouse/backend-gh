import { Profile } from '@app/common/types/personas';

export class ProfileDto implements Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  iconUrl: string;
  role: string;
}
