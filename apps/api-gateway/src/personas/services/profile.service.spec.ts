import { Test, TestingModule } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { ClientGrpc } from '@nestjs/microservices';
import { of } from 'rxjs';
import { PERSONAS_SERVICE } from '../constants';
import {
  CreateProfileDto,
  PROFILES_SERVICE_NAME,
  ProfilesServiceClient,
} from '@app/common/types/personas';

describe('ProfilesService', () => {
  let service: ProfilesService;
  let mockProfilesServiceClient: ProfilesServiceClient;

  beforeEach(async () => {
    mockProfilesServiceClient = {
      createProfile: jest.fn().mockReturnValue(of({})),
      findByUserId: jest.fn().mockReturnValue(of({})),
      findByCompanyId: jest.fn().mockReturnValue(of({})),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: PERSONAS_SERVICE,
          useValue: {
            getService: jest.fn().mockReturnValue(mockProfilesServiceClient),
          },
        },
      ],
    }).compile();

    service = module.get<ProfilesService>(ProfilesService);
    const clientGrpc = module.get<ClientGrpc>(PERSONAS_SERVICE);
    service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a profile', async () => {
    const createProfileDto: CreateProfileDto = { userId: '1', firstName: 'John', lastName: 'doe', iconUrl: 'http://'};
    await service.create(createProfileDto).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockProfilesServiceClient.createProfile).toHaveBeenCalledWith(createProfileDto);
  });

  it('should find profile by user id', async () => {
    const userId = '1';
    await service.findByUserId(userId).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockProfilesServiceClient.findByUserId).toHaveBeenCalledWith({ userId });
  });

  it('should find profiles by company id', async () => {
    const companyId = '1';
    const observable = await service.findByCompanyId(companyId);
    observable.subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockProfilesServiceClient.findByCompanyId).toHaveBeenCalledWith({ companyId });
  });
});
