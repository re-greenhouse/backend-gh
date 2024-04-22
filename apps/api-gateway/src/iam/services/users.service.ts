import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from '@app/common';
import { IAM_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class UsersService implements OnModuleInit {
  private usersService: UsersServiceClient;

  constructor(@Inject(IAM_SERVICE) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.usersService =
      this.client.getService<UsersServiceClient>(USERS_SERVICE_NAME);
  }

  create(createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  findAll() {
    return this.usersService.findAllUsers({});
  }

  findOne(username: string) {
    return this.usersService.findOneUser({ username: username });
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser({
      username: username,
      password: updateUserDto.password,
      role: updateUserDto.role,
    });
  }

  remove(username: string) {
    return this.usersService.removeUser({ username: username });
  }
}
