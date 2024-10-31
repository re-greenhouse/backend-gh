import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMembershipCommand } from './create-membership.command';
import { MembershipFactory } from '../../domain/factories/membership.factory';
import { CreateMembershipRepository } from '../ports/create-membership.repository';
import { Membership } from '../../domain/membership';
import { MembershipStatus } from '../../infrastructure/persistence/orm/enums/membership.status.enum';
import { MembershipLevel } from '../../domain/membershipLevel';
import { FindMembershipLevelsRepository } from '../ports/find-membership-levels.repository';

@CommandHandler(CreateMembershipCommand)
export class CreateMembershipCommandHandler
  implements ICommandHandler<CreateMembershipCommand>
{
  constructor(
    private readonly membershipFactory: MembershipFactory,
    private readonly createMembershipRepository: CreateMembershipRepository,
    private readonly findMembershipLevels: FindMembershipLevelsRepository,
  ) {}

  async execute(command: CreateMembershipCommand): Promise<Membership> {
    const membershipLevel: MembershipLevel =
      await this.findMembershipLevels.findByName(command.membershipLevelName);
    const newMembership: Membership = this.membershipFactory.create(
      membershipLevel,
      command.companyId,
      command.startDate,
      command.endDate,
      MembershipStatus.Active,
    );

    return await this.createMembershipRepository.save(newMembership);
  }
}
