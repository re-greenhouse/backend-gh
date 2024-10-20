import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../commands/create-user.command';
import { ComparePasswordForUsernameQuery } from '../queries/compare-password-for-username.query';
import { GetUserByUsernameQuery } from '../queries/get-user-by-username.query';
import { User } from '../../domain/user';

@Injectable()
export class UsersFacadeService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  createUser(username: string, email: string, password: string) {
    return this.commandBus.execute(
      new CreateUserCommand(username, email, password),
    );
  }

  comparePasswordForUsername(
    username: string,
    password: string,
  ): Promise<boolean> {
    return this.queryBus.execute(
      new ComparePasswordForUsernameQuery(username, password),
    );
  }

  async getRoleByUsername(username: string): Promise<string> {
    const user: User = await this.queryBus.execute(
      new GetUserByUsernameQuery(username),
    );
    return user.role;
  }

  async getIdByUsername(username: string): Promise<string> {
    const user: User = await this.queryBus.execute(
      new GetUserByUsernameQuery(username),
    );
    return user.id;
  }
}
