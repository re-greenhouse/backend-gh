import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateMembershipCommand } from './update-membership.command';
import { FindMembershipsRepository } from '../ports/find-memberships.repository';
import { SaveMembershipRepository } from '../ports/save-membership.repository';
import { Membership } from '../../domain/membership';
import {
  GrpcInvalidArgumentException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';
import { MembershipLevelName } from '../../infrastructure/persistence/orm/enums/membership.level.name.enum';

@CommandHandler(UpdateMembershipCommand)
export class UpdateMembershipCommandHandler
  implements ICommandHandler<UpdateMembershipCommand>
{
  constructor(
    private readonly findMembershipsRepository: FindMembershipsRepository,
    private readonly saveMembershipRepository: SaveMembershipRepository,
  ) {}

  async execute(command: UpdateMembershipCommand): Promise<Membership> {
    const membership = await this.findMembershipsRepository.findById(
      command.id,
    );
    if (membership === undefined) {
      throw new GrpcNotFoundException(
        `Membership '${command.id}' doesn't exist.`,
      );
    }
    if (
      !Object.values(MembershipLevelName).includes(
        command.membershipLevelName as MembershipLevelName,
      )
    ) {
      throw new GrpcInvalidArgumentException(
        `${command.membershipLevelName} is not a valid membership level name.`,
      );
    }
    membership.membershipLevelName =
      command.membershipLevelName as MembershipLevelName;

    return await this.saveMembershipRepository.save(membership);
  }
}
