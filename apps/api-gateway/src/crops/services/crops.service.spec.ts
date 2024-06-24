import { Test, TestingModule } from '@nestjs/testing';
import { CropsService } from './crops.service';
import { ClientGrpc } from '@nestjs/microservices';
import { of } from 'rxjs';
import { CROPS_SERVICE } from '../constants';
import {
  CROPS_SERVICE_NAME,
  CropsServiceClient,
} from '@app/common/types/crops';

describe('CropsService', () => {
  let service: CropsService;
  let mockCropsServiceClient: CropsServiceClient;

  beforeEach(async () => {
    mockCropsServiceClient = {
      createCrop: jest.fn().mockReturnValue(of({})),
      findOneCrop: jest.fn().mockReturnValue(of({})),
      findAll: jest.fn().mockReturnValue(of([])),
      findAllByState: jest.fn().mockReturnValue(of([])),
      updateCrop: jest.fn().mockReturnValue(of({})),
      removeCrop: jest.fn().mockReturnValue(of({})),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CropsService,
        {
          provide: CROPS_SERVICE,
          useValue: {
            getService: jest.fn().mockReturnValue(mockCropsServiceClient),
          },
        },
      ],
    }).compile();

    service = module.get<CropsService>(CropsService);
    const clientGrpc = module.get<ClientGrpc>(CROPS_SERVICE);
    service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a crop', async () => {
    const createCropDto = { name: 'Test Crop', author: 'Test Author' };
    await service.create(createCropDto).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockCropsServiceClient.createCrop).toHaveBeenCalledWith(createCropDto);
  });

  it('should find one crop', async () => {
    const id = '1';
    await service.findOne(id).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockCropsServiceClient.findOneCrop).toHaveBeenCalledWith({ id });
  });

  it('should find all crops', async () => {
    await service.findAll().subscribe(response => {
      expect(response).toEqual([]);
    });
    expect(mockCropsServiceClient.findAll).toHaveBeenCalledWith({});
  });

  it('should find all crops by state', async () => {
    const state = true;
    await service.findAllByState(state).subscribe(response => {
      expect(response).toEqual([]);
    });
    expect(mockCropsServiceClient.findAllByState).toHaveBeenCalledWith({ state });
  });

  it('should update a crop', async () => {
    const id = '1';
    const updateCropDto = { phase: 'new phase', state: true };
    await service.update(id, updateCropDto).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockCropsServiceClient.updateCrop).toHaveBeenCalledWith({
      id,
      phase: updateCropDto.phase,
      state: updateCropDto.state,
    });
  });

  it('should remove a crop', async () => {
    const id = '1';
    await service.remove(id).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockCropsServiceClient.removeCrop).toHaveBeenCalledWith({ id });
  });
});
