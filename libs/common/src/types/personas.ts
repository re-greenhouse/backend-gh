/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "personas";

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  iconUrl: string;
  role: string;
}

export interface Profiles {
  profiles: Profile[];
}

export interface Company {
  id: string;
  name: string;
  logoUrl: string;
  tin: string;
  membershipId: string;
}

export interface UpdateCompanyDto {
  id: string;
  name?: string | undefined;
  tin?: string | undefined;
  logoUrl?: string | undefined;
}

export interface CreateProfileDto {
  userId: string;
  firstName: string;
  lastName: string;
  iconUrl: string;
}

export interface UpdateProfileDto {
  profileId: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  iconUrl?: string | undefined;
}

export interface AddEmployeeDto {
  profileId: string;
  companyId: string;
  isAdmin: boolean;
}

export interface FindOneProfileByUserIdDto {
  userId: string;
}

export interface FindAllByCompanyIdDto {
  companyId: string;
}

export interface FindOneCompanyByProfileId {
  profileId: string;
}

export interface CreateCompanyDto {
  ownerId: string;
  name: string;
  tin: string;
  logoUrl: string;
}

export const PERSONAS_PACKAGE_NAME = "personas";

export interface ProfilesServiceClient {
  createProfile(request: CreateProfileDto): Observable<Profile>;

  findByUserId(request: FindOneProfileByUserIdDto): Observable<Profile>;

  findByCompanyId(request: FindAllByCompanyIdDto): Observable<Profiles>;

  updateProfileById(request: UpdateProfileDto): Observable<Profile>;
}

export interface ProfilesServiceController {
  createProfile(request: CreateProfileDto): Promise<Profile> | Observable<Profile> | Profile;

  findByUserId(request: FindOneProfileByUserIdDto): Promise<Profile> | Observable<Profile> | Profile;

  findByCompanyId(request: FindAllByCompanyIdDto): Promise<Profiles> | Observable<Profiles> | Profiles;

  updateProfileById(request: UpdateProfileDto): Promise<Profile> | Observable<Profile> | Profile;
}

export function ProfilesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createProfile", "findByUserId", "findByCompanyId", "updateProfileById"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProfilesService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProfilesService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PROFILES_SERVICE_NAME = "ProfilesService";

export interface CompaniesServiceClient {
  createCompany(request: CreateCompanyDto): Observable<Company>;

  addEmployee(request: AddEmployeeDto): Observable<Profile>;

  findByProfileId(request: FindOneCompanyByProfileId): Observable<Company>;

  updateCompany(request: UpdateCompanyDto): Observable<Company>;
}

export interface CompaniesServiceController {
  createCompany(request: CreateCompanyDto): Promise<Company> | Observable<Company> | Company;

  addEmployee(request: AddEmployeeDto): Promise<Profile> | Observable<Profile> | Profile;

  findByProfileId(request: FindOneCompanyByProfileId): Promise<Company> | Observable<Company> | Company;

  updateCompany(request: UpdateCompanyDto): Promise<Company> | Observable<Company> | Company;
}

export function CompaniesServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createCompany", "addEmployee", "findByProfileId", "updateCompany"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CompaniesService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CompaniesService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const COMPANIES_SERVICE_NAME = "CompaniesService";
