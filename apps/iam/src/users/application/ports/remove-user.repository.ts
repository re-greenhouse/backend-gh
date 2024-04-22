import { User } from '../../domain/user';

export abstract class RemoveUserRepository {
  abstract remove(user: User): Promise<User>;
}
