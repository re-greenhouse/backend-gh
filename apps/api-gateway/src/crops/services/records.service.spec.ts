import { Test, TestingModule } from '@nestjs/testing';
import { RecordsService } from './records.service';
import { ClientGrpc } from '@nestjs/microservices';
import { of } from 'rxjs';
import { CROPS_SERVICE } from '../constants';
import {
  RECORDS_SERVICE_NAME,
 RecordsServiceClient,
} from '@app/common/types/crops';

describe('RecordsService', () => {
  let service: RecordsService;
  let mockRecordsServiceClient: RecordsServiceClient;

  beforeEach(async () => {
    mockRecordsServiceClient = {
      createRecord: jest.fn().mockReturnValue(of({})),
      findOneRecord: jest.fn().mockReturnValue(of({})),
      findAll: jest.fn().mockReturnValue(of([])),
      findAllByCropAndPhase: jest.fn().mockReturnValue(of([])),
      updateRecord: jest.fn().mockReturnValue(of({})),
      removeRecord: jest.fn().mockReturnValue(of({})),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecordsService,
        {
          provide: CROPS_SERVICE,
          useValue: {
            getService: jest.fn().mockReturnValue(mockRecordsServiceClient),
          },
        },
      ],
    }).compile();

    service = module.get<RecordsService>(RecordsService);
    const clientGrpc = module.get<ClientGrpc>(CROPS_SERVICE);
    service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a record', async () => {
    const createRecordDto = { payload: { key: 'value' }, otherProperty: 'otherValue', cropId: '1', author: 'test', phase: 'test'};
    const expectedPayload = JSON.stringify(createRecordDto.payload);
    await service.create(createRecordDto).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockRecordsServiceClient.createRecord).toHaveBeenCalledWith({
      ...createRecordDto,
      payload: expectedPayload,
    });
  });

  it('should find one record', async () => {
    const id = '1';
    await service.findOne(id).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockRecordsServiceClient.findOneRecord).toHaveBeenCalledWith({ id });
  });

  it('should find all records', async () => {
    await service.findAll().subscribe(response => {
      expect(response).toEqual([]);
    });
    expect(mockRecordsServiceClient.findAll).toHaveBeenCalledWith({});
  });

  it('should find all records by crop and phase', async () => {
    const cropId = 'cropId';
    const phase = 'phase';
    await service.findAllByCropAndPhase(cropId, phase).subscribe(response => {
      expect(response).toEqual([]);
    });
    expect(mockRecordsServiceClient.findAllByCropAndPhase).toHaveBeenCalledWith({
      cropId,
      phase,
    });
  });

  it('should update a record', async () => {
    const id = '1';
    const updateRecordDto = { payload: JSON.stringify({ key: 'new value' }) };
    await service.update(id, updateRecordDto).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockRecordsServiceClient.updateRecord).toHaveBeenCalledWith({
      id,
      payload: updateRecordDto.payload,
    });
  });

  it('should remove a record', async () => {
    const id = '1';
    await service.remove(id).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockRecordsServiceClient.removeRecord).toHaveBeenCalledWith({ id });
  });
});