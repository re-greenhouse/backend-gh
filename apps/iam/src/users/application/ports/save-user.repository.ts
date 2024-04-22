import { User } from '../../domain/user';

export abstract class SaveUserRepository {
  abstract save(user: User): Promise<User>;
}
