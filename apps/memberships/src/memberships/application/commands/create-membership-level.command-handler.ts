import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMembershipLevelCommand } from './create-membership-level.command';
import { MembershipLevelFactory } from '../../domain/factories/membershipLevel.factory';
import { CreateMembershipLevelRepository } from '../ports/create-membership-level.repository';
import { MembershipLevel } from '../../domain/membershipLevel';

@CommandHandler(CreateMembershipLevelCommand)
export class CreateMembershipLevelCommandHandler
  implements ICommandHandler<CreateMembershipLevelCommand>
{
  constructor(
    private readonly membershipLevelFactory: MembershipLevelFactory,
    private readonly createMembershipLevelRepository: CreateMembershipLevelRepository,
  ) {}

  async execute(
    command: CreateMembershipLevelCommand,
  ): Promise<MembershipLevel> {
    const newMembershipLevel = this.membershipLevelFactory.create(
      command.name,
      command.benefits,
    );

    return await this.createMembershipLevelRepository.save(newMembershipLevel);
  }
}
