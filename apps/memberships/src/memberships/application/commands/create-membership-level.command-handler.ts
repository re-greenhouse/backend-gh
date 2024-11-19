import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMembershipLevelCommand } from './create-membership-level.command';
import { MembershipLevelFactory } from '../../domain/factories/membershipLevel.factory';
import { CreateMembershipLevelRepository } from '../ports/create-membership-level.repository';
import { MembershipLevel } from '../../domain/membershipLevel';
import { BenefitFactory } from '../../domain/factories/benefit.factory';
import { CreateBenefitRepository } from '../ports/create-benefit.repository';

@CommandHandler(CreateMembershipLevelCommand)
export class CreateMembershipLevelCommandHandler
  implements ICommandHandler<CreateMembershipLevelCommand>
{
  constructor(
    private readonly membershipLevelFactory: MembershipLevelFactory,
    private readonly benefitFactory: BenefitFactory,
    private readonly createBenefitRepository: CreateBenefitRepository,
    private readonly createMembershipLevelRepository: CreateMembershipLevelRepository,
  ) {}

  async execute(
    command: CreateMembershipLevelCommand,
  ): Promise<MembershipLevel> {
    const benefits = command.benefits.map((benefit) =>
      this.benefitFactory.create(benefit.name, benefit.value),
    );
    const newMembershipLevel = this.membershipLevelFactory.create(
      command.name,
      benefits,
    );

    const savedMembership =
      await this.createMembershipLevelRepository.save(newMembershipLevel);

    newMembershipLevel.benefits.map((benefit) => {
      const newBenefit = benefit;
      newBenefit.membershipLevel = newMembershipLevel;
      this.createBenefitRepository.save(newBenefit);
    });

    return savedMembership;
  }
}
