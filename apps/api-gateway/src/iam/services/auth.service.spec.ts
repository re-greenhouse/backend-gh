import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ClientGrpc } from '@nestjs/microservices';
import { of } from 'rxjs';
import { IAM_SERVICE } from '../constants';
import {
  AUTH_SERVICE_NAME,
  AuthServiceClient,
  SignInDto,
  SignUpDto,
} from '@app/common';

describe('AuthService', () => {
  let service: AuthService;
  let mockAuthServiceClient: AuthServiceClient;

  beforeEach(async () => {
    mockAuthServiceClient = {
      signIn: jest.fn().mockReturnValue(of({})),
      signUp: jest.fn().mockReturnValue(of({})),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: IAM_SERVICE,
          useValue: {
            getService: jest.fn().mockReturnValue(mockAuthServiceClient),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    const clientGrpc = module.get<ClientGrpc>(IAM_SERVICE);
    service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sign in a user', async () => {
    const signInDto: SignInDto = { username: 'testuser', password: 'testpass' };
    await service.signIn(signInDto).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockAuthServiceClient.signIn).toHaveBeenCalledWith(signInDto);
  });

  it('should sign up a user', async () => {
    const signUpDto: SignUpDto = { username: 'testuser', password: 'testpass' };
    await service.signUp(signUpDto).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockAuthServiceClient.signUp).toHaveBeenCalledWith(signUpDto);
  });
});
