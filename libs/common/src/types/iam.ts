/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "iam";

export interface TokenDto {
  token: string;
}

export interface TokenValidationStatus {
  isValid: boolean;
  info?: TokenInfo | undefined;
}

export interface TokenInfo {
  sub: string;
  role: string;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

export interface SignUpDto {
  username: string;
  password: string;
}

export interface SignInDto {
  username: string;
  password: string;
}

export interface UpdateUserDto {
  username: string;
  password?: string | undefined;
  role?: string | undefined;
}

export interface FindOneUserDto {
  username: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  role: string;
}

export interface AuthenticatedUser {
  token: string;
  userId: string;
}

export interface Users {
  users: User[];
}

export interface Empty {
}

export const IAM_PACKAGE_NAME = "iam";

export interface AuthServiceClient {
  signUp(request: SignUpDto): Observable<User>;

  signIn(request: SignInDto): Observable<AuthenticatedUser>;

  validateToken(request: TokenDto): Observable<TokenValidationStatus>;
}

export interface AuthServiceController {
  signUp(request: SignUpDto): Promise<User> | Observable<User> | User;

  signIn(request: SignInDto): Promise<AuthenticatedUser> | Observable<AuthenticatedUser> | AuthenticatedUser;

  validateToken(
    request: TokenDto,
  ): Promise<TokenValidationStatus> | Observable<TokenValidationStatus> | TokenValidationStatus;
}

export function AuthServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["signUp", "signIn", "validateToken"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AuthService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const AUTH_SERVICE_NAME = "AuthService";

export interface UsersServiceClient {
  createUser(request: CreateUserDto): Observable<User>;

  findAllUsers(request: Empty): Observable<Users>;

  findOneUser(request: FindOneUserDto): Observable<User>;

  updateUser(request: UpdateUserDto): Observable<User>;

  removeUser(request: FindOneUserDto): Observable<User>;
}

export interface UsersServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateUserDto): Promise<User> | Observable<User> | User;

  removeUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "findAllUsers", "findOneUser", "updateUser", "removeUser"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UsersService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USERS_SERVICE_NAME = "UsersService";
