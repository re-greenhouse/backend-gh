import { Injectable } from '@nestjs/common';
import { Profile } from '../profile';
import { randomUUID } from 'crypto';
import { Role } from '../../infrastructure/persistence/orm/enums/role.enum';

@Injectable()
export class ProfileFactory {
  create(
    userId: string,
    firstName: string,
    lastName: string,
    iconUrl: string,
  ): Profile {
    const profileId = randomUUID();

    const profile = new Profile(profileId, userId, null);
    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.iconUrl = iconUrl;
    profile.role = Role.Technician;

    return profile;
  }
}
