import { Profile } from '../../../../domain/profile';
import { ProfileEntity } from '../entities/profile.entity';
import { CompanyMapper } from './company.mapper';

export class ProfileMapper {
  static toDomain(profileEntity: ProfileEntity): Profile {
    const profile = new Profile(
      profileEntity.id,
      profileEntity.userId,
      profileEntity.company
        ? CompanyMapper.toDomain(profileEntity.company)
        : null,
    );

    profile.iconUrl = profileEntity.iconUrl;
    profile.firstName = profileEntity.firstName;
    profile.lastName = profileEntity.lastName;
    profile.roles = profileEntity.roles;

    return profile;
  }

  static toPersistence(profile: Profile): ProfileEntity {
    const profileEntity = new ProfileEntity();

    profileEntity.id = profile.id;
    profileEntity.iconUrl = profile.iconUrl;
    profileEntity.userId = profile.userId;
    profileEntity.firstName = profile.firstName;
    profileEntity.lastName = profile.lastName;
    profileEntity.roles = profile.roles;
    profileEntity.company = profile.company
      ? CompanyMapper.toPersistence(profile.company)
      : null;

    return profileEntity;
  }
}
