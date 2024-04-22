import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete-user.command';
import { User } from '../../domain/user';
import { FindUsersRepository } from '../ports/find-users.repository';
import { RemoveUserRepository } from '../ports/remove-user.repository';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler
  implements ICommandHandler<DeleteUserCommand>
{
  constructor(
    private readonly findUsersRepository: FindUsersRepository,
    private readonly removeUserRepository: RemoveUserRepository,
  ) {}

  async execute(command: DeleteUserCommand): Promise<User> {
    const user = await this.findUsersRepository.findByUsername(
      command.username,
    );
    if (user === undefined) {
      throw new GrpcNotFoundException(
        `User '${command.username}' doesn't exists.`,
      );
    }
    return await this.removeUserRepository.remove(user);
  }
}
