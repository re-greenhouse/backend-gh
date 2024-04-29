import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from './sign-in.command';
import { UsersFacadeService } from '../../../users/application/facades/users-facade.service';
import { GrpcUnauthenticatedException } from 'nestjs-grpc-exceptions';
import { AuthenticatedUser } from '@app/common';
import { SignTokenService } from '../../../shared/application/outbound-services/sign-token.service';

// TODO: We can improve this. Instead of a sign in command, we can
// have a ComparePasswordQuery. We execute this query after we have
// checked that the user exists and, if the passwords match, we must
// call a SignTokenCommand to return that to the user.
@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
  constructor(
    private readonly usersFacadeService: UsersFacadeService,
    private readonly signTokenService: SignTokenService,
  ) {}

  async execute(command: SignInCommand): Promise<AuthenticatedUser> {
    if (
      !(await this.usersFacadeService.comparePasswordForUsername(
        command.username,
        command.password,
      ))
    ) {
      throw new GrpcUnauthenticatedException(`Invalid credentials.`);
    }

    const userRole = await this.usersFacadeService.getRoleByUsername(
      command.username,
    );

    const userId = await this.usersFacadeService.getIdByUsername(
      command.username,
    );

    return {
      token: await this.signTokenService.signToken<{ role: string }>(
        command.username,
        { role: userRole },
      ),
      userId: userId,
    };
  }
}
