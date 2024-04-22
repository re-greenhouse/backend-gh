import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/create-user.command';
import { GetUsersQuery } from './queries/get-users.query';
import { GetUserByUsernameQuery } from './queries/get-user-by-username.query';
import { User } from '../domain/user';
import { UpdateUserCommand } from './commands/update-user.command';
import { DeleteUserCommand } from './commands/delete-user.command';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createUserCommand: CreateUserCommand) {
    return this.commandBus.execute(createUserCommand);
  }

  findAll() {
    return this.queryBus.execute(new GetUsersQuery());
  }

  findByUsername(username: string): Promise<User> {
    return this.queryBus.execute(new GetUserByUsernameQuery(username));
  }

  update(updateUserCommand: UpdateUserCommand): Promise<User> {
    return this.commandBus.execute(updateUserCommand);
  }

  remove(deleteUserCommand: DeleteUserCommand): Promise<User> {
    return this.commandBus.execute(deleteUserCommand);
  }
}
