import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { User } from '../user';
import { Role } from '../../infrastructure/persistence/orm/enums/role.enum';

@Injectable()
export class UserFactory {
  create(username: string, email: string, password: string): User {
    const userId = randomUUID();

    const user = new User(userId, email);
    user.username = username;
    user.password = password;
    user.role = Role.Regular;

    return user;
  }
}
