import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignInCommand } from './commands/sign-in.command';

@Injectable()
export class AuthService {
  constructor(private readonly commandBus: CommandBus) {}

  signIn(signInCommand: SignInCommand) {
    return this.commandBus.execute(signInCommand);
  }
}
