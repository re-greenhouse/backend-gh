import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { UserFactory } from '../../domain/factories/user.factory';
import { CreateUserRepository } from '../ports/create-user.repository';
import { User } from '../../domain/user';
import { FindUsersRepository } from '../ports/find-users.repository';
import { GrpcAlreadyExistsException } from 'nestjs-grpc-exceptions';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    private readonly userFactory: UserFactory,
    private readonly createUserRepository: CreateUserRepository,
    private readonly findUsersRepository: FindUsersRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    if (await this.findUsersRepository.findByUsername(command.username)) {
      throw new GrpcAlreadyExistsException(
        `There's an existing user with '${command.username}' as username.`,
      );
    }

    if (await this.findUsersRepository.findByEmail(command.email)) {
      throw new GrpcAlreadyExistsException(
        `There's an existing user with '${command.email}' as email.`,
      );
    }

    const user: User = this.userFactory.create(
      command.username,
      command.email,
      command.password,
    );
    return await this.createUserRepository.save(user);
  }
}
