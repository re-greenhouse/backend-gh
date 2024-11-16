import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateMembershipCommand } from './create-membership.command';
import { MembershipFactory } from '../../domain/factories/membership.factory';
import { CreateMembershipRepository } from '../ports/create-membership.repository';
import { Membership } from '../../domain/membership';
import { MembershipLevelName } from '../../infrastructure/persistence/orm/enums/membership.level.name.enum';
import { GrpcInvalidArgumentException } from 'nestjs-grpc-exceptions';

@CommandHandler(CreateMembershipCommand)
export class CreateMembershipCommandHandler
  implements ICommandHandler<CreateMembershipCommand>
{
  constructor(
    private readonly membershipFactory: MembershipFactory,
    private readonly createMembershipRepository: CreateMembershipRepository,
  ) {}

  async execute(command: CreateMembershipCommand): Promise<Membership> {
    if (
      !Object.values(MembershipLevelName).includes(
        command.membershipLevelName as MembershipLevelName,
      )
    ) {
      throw new GrpcInvalidArgumentException(
        `${command.membershipLevelName} is not a valid membership level name.`,
      );
    }

    const newMembership: Membership = this.membershipFactory.create(
      command.membershipLevelName as MembershipLevelName,
      command.companyId,
      command.startDate,
      command.endDate,
    );

    return await this.createMembershipRepository.save(newMembership);
  }
}
