import { Profile } from '../../domain/profile';

export abstract class CreateProfileRepository {
  abstract save(profile: Profile): Promise<Profile>;
}
