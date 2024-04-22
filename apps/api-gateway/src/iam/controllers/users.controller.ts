import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '@app/common';
import { Roles } from '../../shared/decorators/role.decorator';
import { Role } from '../../shared/enums/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.Admin) // Custom decorator
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }
  // If request is from same user, OK
  // If request is from admin, OK
  @Patch(':username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(username, updateUserDto);
  }
  // If request is from same user, OK
  // If request is from admin, OK
  @Delete(':username')
  remove(@Param('username') username: string) {
    return this.usersService.remove(username);
  }
}
