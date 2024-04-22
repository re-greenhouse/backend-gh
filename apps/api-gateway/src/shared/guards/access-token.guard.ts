import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@app/common';
import { IAM_SERVICE } from '../../iam/constants';
import { ClientGrpc } from '@nestjs/microservices';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AccessTokenGuard implements CanActivate, OnModuleInit {
  private authService: AuthServiceClient;

  constructor(
    private readonly reflector: Reflector,
    @Inject(IAM_SERVICE) private readonly client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.authService =
      this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('User is not authenticated.');
    }

    try {
      const validationStatus = await firstValueFrom(
        this.authService.validateToken({
          token: token,
        }),
      );
      if (!validationStatus.isValid || !validationStatus.info) {
        throw new UnauthorizedException('User is not authenticated.');
      }
      request['user'] = validationStatus.info;
    } catch (error) {
      throw new UnauthorizedException('User is not authenticated.');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [, token] = request.headers['authorization']?.split(' ') ?? [];
    return token;
  }
}
