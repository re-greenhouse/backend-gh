/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "mailing";

export interface MailPayloadDto {
  eventName: string;
  email: string;
  payloadVariables: PayloadVariable[];
}

export interface PayloadVariable {
  variable: string;
  value: string;
}

export interface CreateTemplateDto {
  eventName: string;
  subject: string;
  body: string;
}

export interface FindAllTemplatesDto {
}

export interface FindOneTemplateDto {
  id: string;
}

export interface FindOneTemplateByEventNameDto {
  eventName: string;
}

export interface UpdateTemplateDto {
  id: string;
  subject?: string | undefined;
  body?: string | undefined;
}

export interface Templates {
  templates: Template[];
}

export interface Template {
  id: string;
  eventName: string;
  subject: string;
  body: string;
}

export interface MailSendResponse {
  success: boolean;
}

export const MAILING_PACKAGE_NAME = "mailing";

export interface MailingServiceClient {
  sendMail(request: MailPayloadDto): Observable<MailSendResponse>;
}

export interface MailingServiceController {
  sendMail(request: MailPayloadDto): Promise<MailSendResponse> | Observable<MailSendResponse> | MailSendResponse;
}

export function MailingServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["sendMail"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("MailingService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("MailingService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const MAILING_SERVICE_NAME = "MailingService";

export interface TemplateServiceClient {
  create(request: CreateTemplateDto): Observable<Template>;

  findAll(request: FindAllTemplatesDto): Observable<Templates>;

  findOne(request: FindOneTemplateDto): Observable<Template>;

  findOneByEventName(request: FindOneTemplateByEventNameDto): Observable<Template>;

  update(request: UpdateTemplateDto): Observable<Template>;

  remove(request: FindOneTemplateDto): Observable<Template>;
}

export interface TemplateServiceController {
  create(request: CreateTemplateDto): Promise<Template> | Observable<Template> | Template;

  findAll(request: FindAllTemplatesDto): Promise<Templates> | Observable<Templates> | Templates;

  findOne(request: FindOneTemplateDto): Promise<Template> | Observable<Template> | Template;

  findOneByEventName(request: FindOneTemplateByEventNameDto): Promise<Template> | Observable<Template> | Template;

  update(request: UpdateTemplateDto): Promise<Template> | Observable<Template> | Template;

  remove(request: FindOneTemplateDto): Promise<Template> | Observable<Template> | Template;
}

export function TemplateServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "findAll", "findOne", "findOneByEventName", "update", "remove"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("TemplateService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("TemplateService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const TEMPLATE_SERVICE_NAME = "TemplateService";
