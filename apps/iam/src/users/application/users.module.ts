import { Module } from '@nestjs/common';
import { UsersController } from '../presenters/grpc/users.controller';
import { UsersInfrastructureModule } from '../infrastructure/users-infrastructure.module';
import { UserFactory } from '../domain/factories/user.factory';
import { CreateUserCommand } from './commands/create-user.command';
import { CreateUserCommandHandler } from './commands/create-user.command-handler';
import { UserService } from './user.service';
import { GetUsersQuery } from './queries/get-users.query';
import { GetUsersQueryHandler } from './queries/get-users.query-handler';
import { GetUserByUsernameQuery } from './queries/get-user-by-username.query';
import { GetUserByUsernameQueryHandler } from './queries/get-user-by-username.query-handler';
import { UpdateUserCommand } from './commands/update-user.command';
import { UpdateUserCommandHandler } from './commands/update-user.command-handler';
import { DeleteUserCommand } from './commands/delete-user.command';
import { DeleteUserCommandHandler } from './commands/delete-user.command-handler';
import { UsersFacadeService } from './facades/users-facade.service';
import { ComparePasswordForUsernameQuery } from './queries/compare-password-for-username.query';
import { ComparePasswordForUsernameQueryHandler } from './queries/compare-password-for-username.query-handler';
import { SharedModule } from '../../shared/application/shared.module';

@Module({
  imports: [UsersInfrastructureModule, SharedModule],
  controllers: [UsersController],
  providers: [
    UsersFacadeService,
    UserService,
    UserFactory,
    CreateUserCommand,
    CreateUserCommandHandler,
    UpdateUserCommand,
    UpdateUserCommandHandler,
    DeleteUserCommand,
    DeleteUserCommandHandler,
    GetUsersQuery,
    GetUsersQueryHandler,
    GetUserByUsernameQuery,
    GetUserByUsernameQueryHandler,
    ComparePasswordForUsernameQuery,
    ComparePasswordForUsernameQueryHandler,
  ],
  exports: [UsersFacadeService],
})
export class UsersModule {}
