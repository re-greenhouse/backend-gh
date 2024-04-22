import { Profile } from '../../domain/profile';

export abstract class FindProfilesRepository {
  abstract findAll(): Promise<Array<Profile>>;
  abstract findById(id: string): Promise<Profile | undefined>;
  abstract findByUserId(userId: string): Promise<Profile | undefined>;
  abstract existByUserId(userId: string): Promise<boolean>;
}
