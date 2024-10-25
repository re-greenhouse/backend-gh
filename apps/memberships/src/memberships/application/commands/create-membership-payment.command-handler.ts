import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMembershipPaymentCommand } from './create-membership-payment.command';
import { MembershipPaymentFactory } from '../../domain/factories/membershipPayment.factory';
import { CreateMembershipPaymentRepository } from '../ports/create-membership-payment.repository';
import { MembershipPayment } from '../../domain/membershipPayment';

@CommandHandler(CreateMembershipPaymentCommand)
export class CreateMembershipPaymentCommandHandler
  implements ICommandHandler<CreateMembershipPaymentCommand>
{
  constructor(
    private readonly membershipPaymentFactory: MembershipPaymentFactory,
    private readonly createMembershipPaymentRepository: CreateMembershipPaymentRepository,
  ) {}

  async execute(
    command: CreateMembershipPaymentCommand,
  ): Promise<MembershipPayment> {
    const newMembershipPayment = this.membershipPaymentFactory.create(
      command.membershipId,
      command.amount,
      command.paymentDate,
      command.paymentMethod,
    );

    return await this.createMembershipPaymentRepository.save(
      newMembershipPayment,
    );
  }
}
