import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { FindUsersRepository } from '../ports/find-users.repository';
import {
  GrpcInvalidArgumentException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';
import { Role } from '../../infrastructure/persistence/orm/enums/role.enum';
import { SaveUserRepository } from '../ports/save-user.repository';

@CommandHandler(UpdateUserCommand)
export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  constructor(
    private readonly findUsersRepository: FindUsersRepository,
    private readonly saveUserRepository: SaveUserRepository,
  ) {}

  async execute(command: UpdateUserCommand) {
    const user = await this.findUsersRepository.findByUsername(
      command.username,
    );
    if (user === undefined) {
      throw new GrpcNotFoundException(
        `User '${command.username}' doesn't exists.`,
      );
    }
    if (command.role && !Object.values(Role).includes(command.role as Role)) {
      throw new GrpcInvalidArgumentException(
        `${command.role} is not a valid role.`,
      );
    }
    user.role = command.role as Role;
    user.password = command.password ?? user.password;
    return await this.saveUserRepository.save(user);
  }
}
