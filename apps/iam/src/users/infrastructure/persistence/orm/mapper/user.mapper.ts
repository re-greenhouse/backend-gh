import { UserEntity } from '../entities/user.entity';
import { User } from '../../../../domain/user';
import { Role } from '../enums/role.enum';

export class UserMapper {
  static toDomain(userEntity: UserEntity): User {
    const user = new User(userEntity.id, userEntity.email);

    user.username = userEntity.username;
    user.password = userEntity.password;
    user.role = userEntity.role as Role;

    return user;
  }

  static toPersistence(user: User): UserEntity {
    const userEntity = new UserEntity();

    userEntity.id = user.id;
    userEntity.username = user.username;
    userEntity.email = user.email.toString();
    userEntity.password = user.password;
    userEntity.role = user.role;

    return userEntity;
  }
}
