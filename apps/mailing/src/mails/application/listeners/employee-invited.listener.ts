import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { PayloadVariable } from '@app/common/types/mailing';
import { FindTemplateRepository } from '../ports/find-template.repository';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { ResendFacadeService } from '../resend-facade.service';

@Injectable()
export class EmployeeInvitedListener {
  private static readonly eventName: string = 'employee.invited';

  constructor(
    private readonly findTemplateRepository: FindTemplateRepository,
    private readonly resendFacadeService: ResendFacadeService,
  ) {}

  @OnEvent(EmployeeInvitedListener.eventName)
  async handleOrderCreatedEvent(
    email: string,
    variables: Array<PayloadVariable>,
  ) {
    const template = await this.findTemplateRepository.findByEventName(
      EmployeeInvitedListener.eventName,
    );

    if (!template) {
      throw new GrpcNotFoundException(
        `Template for event '${EmployeeInvitedListener.eventName}' not found'`,
      );
    }

    await this.resendFacadeService.sendMail(
      email,
      template.buildMail(variables),
    );
  }
}
