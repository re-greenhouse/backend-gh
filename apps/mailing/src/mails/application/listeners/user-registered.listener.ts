import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PayloadVariable } from '@app/common/types/mailing';
import { FindTemplateRepository } from '../ports/find-template.repository';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { ResendFacadeService } from '../resend-facade.service';

@Injectable()
export class UserRegisteredListener {
  private static readonly eventName: string = 'user.registered';

  constructor(
    private readonly findTemplateRepository: FindTemplateRepository,
    private readonly resendFacadeService: ResendFacadeService,
  ) {}

  @OnEvent(UserRegisteredListener.eventName)
  async handleOrderCreatedEvent(
    email: string,
    variables: Array<PayloadVariable>,
  ) {
    const template = await this.findTemplateRepository.findByEventName(
      UserRegisteredListener.eventName,
    );

    if (!template) {
      throw new GrpcNotFoundException(
        `Template for event '${UserRegisteredListener.eventName}' not found'`,
      );
    }

    await this.resendFacadeService.sendMail(
      email,
      template.buildMail(variables),
    );
  }
}
