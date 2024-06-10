import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { USERS_SERVICE_NAME, UsersServiceClient } from '@app/common';
import { IAM_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserFacadeService implements OnModuleInit {
  private usersService: UsersServiceClient;

  constructor(@Inject(IAM_SERVICE) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.usersService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  async getIdByUsername(username: string) {
    const user = await firstValueFrom(
      this.usersService.findOneUser({ username: username }),
    );
    return user.id;
  }
}
