import { Controller } from '@nestjs/common';
import {
  AuthenticatedUser,
  AuthServiceController,
  AuthServiceControllerMethods,
  SignInDto,
  SignUpDto,
  TokenDto,
  TokenValidationStatus,
  User,
} from '@app/common';
import { AuthService } from '../../application/auth.service';
import { SignInCommand } from '../../application/commands/sign-in.command';
import { UsersFacadeService } from '../../../users/application/facades/users-facade.service';
import { HashingService } from '../../../shared/application/outbound-services/hashing.service';
import { TokenValidationService } from '../../../shared/application/outbound-services/token-validation.service';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersFacadeService: UsersFacadeService,
    private readonly hashingService: HashingService,
    private readonly tokenValidationService: TokenValidationService,
  ) {}

  async signIn(request: SignInDto): Promise<AuthenticatedUser> {
    return this.authService.signIn(
      new SignInCommand(request.username, request.password),
    );
  }

  async signUp(request: SignUpDto): Promise<User> {
    const hashedPassword = await this.hashingService.hash(request.password);
    return this.usersFacadeService.createUser(
      request.username,
      request.email,
      hashedPassword,
    );
  }

  async validateToken(request: TokenDto): Promise<TokenValidationStatus> {
    const status = await this.tokenValidationService.isValid(request.token);
    return { isValid: status.isValid, info: status.info };
  }
}
