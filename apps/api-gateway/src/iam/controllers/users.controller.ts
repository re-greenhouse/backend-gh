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
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../dtos/User.dto';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
    type: UserDto,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles(Role.Admin) // Custom decorator
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve all users',
    type: UserDto,
    isArray: true,
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':username')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieve user by username',
    type: UserDto,
  })
  findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }
  // If request is from same user, OK
  // If request is from admin, OK
  @Patch(':username')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update a user by username',
    type: UserDto,
  })
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(username, updateUserDto);
  }
  // If request is from same user, OK
  // If request is from admin, OK
  @Delete(':username')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete a user by username',
    type: UserDto,
  })
  remove(@Param('username') username: string) {
    return this.usersService.remove(username);
  }
}
