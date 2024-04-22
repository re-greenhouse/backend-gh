import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInCommand } from './commands/sign-in.command';
import { SignInCommandHandler } from './commands/sign-in.command-handler';
import { AuthController } from '../presenters/grpc/auth.controller';
import { UsersModule } from '../../users/application/users.module';
import { SharedModule } from '../../shared/application/shared.module';

@Module({
  imports: [UsersModule, SharedModule],
  controllers: [AuthController],
  providers: [AuthService, SignInCommand, SignInCommandHandler],
})
export class AuthModule {}
