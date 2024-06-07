/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'crops';

export interface Crop {
  id: string;
  name: string;
  author: string;
  phase: string;
  state: boolean;
  startDate: string;
}

export interface CropResponse {
  crops: Crop[];
}

export interface CropRecord {
  id: string;
  createdDate: string;
  updatedDate: string;
  author: string;
  phase: string;
  payload: string;
}

export interface CropRecordResponse {
  records: CropRecord[];
}

export interface CreateCropDto {
  name: string;
  author: string;
}

export interface FindAllCropsDto {}

export interface FindAllCropsByStateDto {
  state: boolean;
}

export interface FindOneCropDto {
  id: string;
}

export interface UpdateCropDto {
  id: string;
  phase?: string | undefined;
  state?: boolean | undefined;
}

export interface CreateRecordDto {
  author: string;
  phase: string;
  payload: string;
  cropId: string;
}

export interface FindAllRecordsDto {}

export interface FindAllRecordsByCropAndPhase {
  cropId: string;
  phase: string;
}

export const CROPS_PACKAGE_NAME = 'crops';

export interface CropsServiceClient {
  createCrop(request: CreateCropDto): Observable<Crop>;

  findAll(request: FindAllCropsDto): Observable<CropResponse>;

  findAllByState(request: FindAllCropsByStateDto): Observable<CropResponse>;

  findOneCrop(request: FindOneCropDto): Observable<Crop>;

  updateCrop(request: UpdateCropDto): Observable<Crop>;

  removeCrop(request: FindOneCropDto): Observable<Crop>;
}

export interface CropsServiceController {
  createCrop(request: CreateCropDto): Promise<Crop> | Observable<Crop> | Crop;

  findAll(
    request: FindAllCropsDto,
  ): Promise<CropResponse> | Observable<CropResponse> | CropResponse;

  findAllByState(
    request: FindAllCropsByStateDto,
  ): Promise<CropResponse> | Observable<CropResponse> | CropResponse;

  findOneCrop(request: FindOneCropDto): Promise<Crop> | Observable<Crop> | Crop;

  updateCrop(request: UpdateCropDto): Promise<Crop> | Observable<Crop> | Crop;

  removeCrop(request: FindOneCropDto): Promise<Crop> | Observable<Crop> | Crop;
}

export function CropsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createCrop',
      'findAll',
      'findAllByState',
      'findOneCrop',
      'updateCrop',
      'removeCrop',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('CropsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('CropsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const CROPS_SERVICE_NAME = 'CropsService';

export interface RecordsServiceClient {
  createRecord(request: CreateRecordDto): Observable<CropRecord>;

  findAll(request: FindAllRecordsDto): Observable<CropRecordResponse>;

  findAllByCropAndPhase(
    request: FindAllRecordsByCropAndPhase,
  ): Observable<CropRecordResponse>;
}

export interface RecordsServiceController {
  createRecord(
    request: CreateRecordDto,
  ): Promise<CropRecord> | Observable<CropRecord> | CropRecord;

  findAll(
    request: FindAllRecordsDto,
  ):
    | Promise<CropRecordResponse>
    | Observable<CropRecordResponse>
    | CropRecordResponse;

  findAllByCropAndPhase(
    request: FindAllRecordsByCropAndPhase,
  ):
    | Promise<CropRecordResponse>
    | Observable<CropRecordResponse>
    | CropRecordResponse;
}

export function RecordsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createRecord',
      'findAll',
      'findAllByCropAndPhase',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('RecordsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('RecordsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const RECORDS_SERVICE_NAME = 'RecordsService';
