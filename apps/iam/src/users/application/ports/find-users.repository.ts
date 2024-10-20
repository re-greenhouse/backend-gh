import { User } from '../../domain/user';

export abstract class FindUsersRepository {
  abstract findAll(): Promise<Array<User>>;
  abstract findByUsername(username: string): Promise<User | undefined>;
  abstract findByEmail(email: string): Promise<User | undefined>;
}
