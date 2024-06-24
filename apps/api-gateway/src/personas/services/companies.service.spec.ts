import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { ClientGrpc } from '@nestjs/microservices';
import { of } from 'rxjs';
import { PERSONAS_SERVICE } from '../constants';
import {
  CompaniesServiceClient,
  COMPANIES_SERVICE_NAME,
} from '@app/common/types/personas';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let mockCompaniesServiceClient: CompaniesServiceClient;

  beforeEach(async () => {
    mockCompaniesServiceClient = {
      createCompany: jest.fn().mockReturnValue(of({})),
      findByProfileId: jest.fn().mockReturnValue(of({})),
      addEmployee: jest.fn().mockReturnValue(of({})),
      updateCompany: jest.fn().mockReturnValue(of({})),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: PERSONAS_SERVICE,
          useValue: {
            getService: jest.fn().mockReturnValue(mockCompaniesServiceClient),
          },
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    const clientGrpc = module.get<ClientGrpc>(PERSONAS_SERVICE);
    service.onModuleInit();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a company', async () => {
    const ownerId = 'ownerId';
    const createCompanyDto: CreateCompanyDto = { name: 'test', logoUrl: 'url', tin: 'tin' };
    await service.create(ownerId, createCompanyDto).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockCompaniesServiceClient.createCompany).toHaveBeenCalledWith({
      name: createCompanyDto.name,
      logoUrl: createCompanyDto.logoUrl,
      tin: createCompanyDto.tin,
      ownerId: ownerId,
    });
  });

  it('should find company by profile id', async () => {
    const profileId = 'profileId';
    await service.findByProfileId(profileId).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockCompaniesServiceClient.findByProfileId).toHaveBeenCalledWith({ profileId });
  });

  it('should add an employee', async () => {
    const companyId = 'companyId';
    const employeeProfileId = 'employeeProfileId';
    await service.addEmployee(companyId, employeeProfileId).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockCompaniesServiceClient.addEmployee).toHaveBeenCalledWith({
      companyId: companyId,
      profileId: employeeProfileId,
    });
  });

  it('should update a company', async () => {
    const companyId = 'companyId';
    const updateCompanyDto: UpdateCompanyDto = { name: 'new name', logoUrl: 'new url', tin: 'new tin' };
    await service.update(companyId, updateCompanyDto).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(mockCompaniesServiceClient.updateCompany).toHaveBeenCalledWith({
      id: companyId,
      name: updateCompanyDto.name,
      logoUrl: updateCompanyDto.logoUrl,
      tin: updateCompanyDto.tin,
    });
  });
});
