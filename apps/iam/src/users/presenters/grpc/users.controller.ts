import { Controller } from '@nestjs/common';
import {
  CreateUserDto,
  FindOneUserDto,
  UpdateUserDto,
  User,
  Users,
  UsersServiceController,
  UsersServiceControllerMethods,
} from '@app/common';
import { UserService } from '../../application/user.service';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { UpdateUserCommand } from '../../application/commands/update-user.command';
import { DeleteUserCommand } from '../../application/commands/delete-user.command';

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
  constructor(private readonly usersService: UserService) {}

  createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(
      new CreateUserCommand(
        createUserDto.username,
        createUserDto.email,
        createUserDto.password,
      ),
    );
  }

  async findAllUsers(): Promise<Users> {
    return { users: await this.usersService.findAll() };
  }

  async findOneUser(findOneUserDto: FindOneUserDto): Promise<User> {
    const user = await this.usersService.findByUsername(
      findOneUserDto.username,
    );
    return { ...user, email: user.email.toString() };
  }

  async removeUser(findOneUserDto: FindOneUserDto): Promise<User> {
    const user = await this.usersService.remove(
      new DeleteUserCommand(findOneUserDto.username),
    );
    return { ...user, email: user.email.toString() };
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.usersService.update(
      new UpdateUserCommand(
        updateUserDto.username,
        updateUserDto.password,
        updateUserDto.role,
      ),
    );
    return { ...user, email: user.email.toString() };
  }
}
