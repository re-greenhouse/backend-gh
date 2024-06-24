import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { ClientGrpc } from '@nestjs/microservices';
import { of } from 'rxjs';
import { IAM_SERVICE } from '../constants';
import {
  USERS_SERVICE_NAME,
  UsersServiceClient,
} from '@app/common';

describe('UsersService', () => {
  let service: UsersService;
  let mockUsersServiceClient: UsersServiceClient;

  beforeEach(async () => {
    mockUsersServiceClient = {
      createUser: jest.fn().mockReturnValue(of({})),
      findOneUser: jest.fn().mockReturnValue(of({})),
      findAll: jest.fn().mockReturnValue(of([])),
      updateUser: jest.fn().mockReturnValue(of({})),
      removeUser: jest.fn().mockReturnValue(of({})),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: IAM_SERVICE,
          useValue: {
            getService: jest.fn().mockReturnValue(mockUsersServiceClient),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    const clientGrpc = module.get<ClientGrpc>(IAM_SERVICE);
    service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = { username: 'foo', password: 'bar' };
    await service.create(createUserDto).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockUsersServiceClient.createUser).toHaveBeenCalledWith(createUserDto);
  });

  it('should find one user', async () => {
    const username = 'foo';
    await service.findOne(username).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockUsersServiceClient.findOneUser).toHaveBeenCalledWith({ username });
  });

//   it('should find all user', async () => {
//     await service.findAll().subscribe(response => {
//       expect(response).toEqual([]);
//     });
//     expect(mockUsersServiceClient.findAllUsers).toHaveBeenCalledWith({});
//   });

  it('should update a user', async () => {
    const updateUserDto = { username: 'new', password: 'new', role: 'admin' };
    await service.update(updateUserDto.username, updateUserDto).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockUsersServiceClient.updateUser).toHaveBeenCalledWith({
      username: updateUserDto.username,
      password: updateUserDto.password,
      role: updateUserDto.role,
    });
  });

  it('should remove a user', async () => {
    const username = 'foo';
    await service.remove(username).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockUsersServiceClient.removeUser).toHaveBeenCalledWith({ username });
  });
});
