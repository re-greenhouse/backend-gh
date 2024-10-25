// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               v3.20.3
// source: proto/memberships.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export const protobufPackage = 'memberships';

export interface Membership {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  membershipLevel: MembershipLevel | undefined;
  membershipPayment: MembershipPayment | undefined;
}

export interface MembershipLevel {
  id: string;
  name: string;
  benefits: Benefit[];
}

export interface MembershipPayment {
  id: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  membershipId: string;
}

export interface Benefit {
  name: string;
  value: number;
}

export interface CreateMembershipDto {
  startDate: string;
  endDate: string;
  membershipLevel: MembershipLevel | undefined;
  membershipPayment: MembershipPayment | undefined;
  companyId: string;
}

export interface CreateMembershipPaymentDto {
  membershipId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
}

export interface FindMembershipByCompany {
  companyId: string;
}

export interface FindMembershipsLevelByName {
  name: string;
}

export const MEMBERSHIPS_PACKAGE_NAME = 'memberships';

export interface MembershipsServiceClient {
  createMembership(request: CreateMembershipDto): Observable<Membership>;

  findByCompany(request: FindMembershipByCompany): Observable<Membership>;
}

export interface MembershipsServiceController {
  createMembership(
    request: CreateMembershipDto,
  ): Promise<Membership> | Observable<Membership> | Membership;

  findByCompany(
    request: FindMembershipByCompany,
  ): Promise<Membership> | Observable<Membership> | Membership;
}

export function MembershipsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createMembership', 'findByCompany'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('MembershipsService', method)(
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
      GrpcStreamMethod('MembershipsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const MEMBERSHIPS_SERVICE_NAME = 'MembershipsService';

export interface MembershipsPaymentServiceClient {
  createMembershipPayment(
    request: CreateMembershipPaymentDto,
  ): Observable<MembershipPayment>;
}

export interface MembershipsPaymentServiceController {
  createMembershipPayment(
    request: CreateMembershipPaymentDto,
  ):
    | Promise<MembershipPayment>
    | Observable<MembershipPayment>
    | MembershipPayment;
}

export function MembershipsPaymentServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['createMembershipPayment'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('MembershipsPaymentService', method)(
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
      GrpcStreamMethod('MembershipsPaymentService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const MEMBERSHIPS_PAYMENT_SERVICE_NAME = 'MembershipsPaymentService';

export interface MembershipsLevelServiceClient {
  findByName(request: FindMembershipsLevelByName): Observable<MembershipLevel>;
}

export interface MembershipsLevelServiceController {
  findByName(
    request: FindMembershipsLevelByName,
  ): Promise<MembershipLevel> | Observable<MembershipLevel> | MembershipLevel;
}

export function MembershipsLevelServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['findByName'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('MembershipsLevelService', method)(
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
      GrpcStreamMethod('MembershipsLevelService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const MEMBERSHIPS_LEVEL_SERVICE_NAME = 'MembershipsLevelService';