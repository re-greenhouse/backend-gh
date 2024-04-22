import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  SignInDto,
  SignUpDto,
} from '@app/common';
import { IAM_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;

  constructor(@Inject(IAM_SERVICE) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  signIn(signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  signUp(signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
