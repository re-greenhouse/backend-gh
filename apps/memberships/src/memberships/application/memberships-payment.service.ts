import { CommandBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateMembershipPaymentCommand } from './commands/create-membership-payment.command';

@Injectable()
export class MembershipsPaymentService {
  constructor(private readonly commandBus: CommandBus) {}

  create(createMembershipPaymentCommand: CreateMembershipPaymentCommand) {
    return this.commandBus.execute(createMembershipPaymentCommand);
  }
}
