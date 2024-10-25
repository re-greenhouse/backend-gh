import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMembershipCommand } from './create-membership.command';
import { MembershipFactory } from '../../domain/factories/membership.factory';
import { CreateMembershipRepository } from '../ports/create-membership.repository';
import { Membership } from '../../domain/membership';
import { MembershipStatus } from '../../infrastructure/persistence/orm/enums/membership.status.enum';

@CommandHandler(CreateMembershipCommand)
export class CreateMembershipCommandHandler
  implements ICommandHandler<CreateMembershipCommand>
{
  constructor(
    private readonly membershipFactory: MembershipFactory,
    private readonly createMembershipRepository: CreateMembershipRepository,
  ) {}

  async execute(command: CreateMembershipCommand): Promise<Membership> {
    const newMembership: Membership = this.membershipFactory.create(
      command.membershipLevel,
      command.membershipPayment,
      command.companyId,
      command.startDate,
      command.endDate,
      MembershipStatus.Active,
    );

    return await this.createMembershipRepository.save(newMembership);
  }
}
