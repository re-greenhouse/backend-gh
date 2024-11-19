import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetMembershipsLevelByNameQuery } from './queries/get-memberships-level-by-name.query';
import { Injectable } from '@nestjs/common';
import { CreateMembershipLevelCommand } from './commands/create-membership-level.command';

@Injectable()
export class MembershipLevelService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createMembershipLevelCommand: CreateMembershipLevelCommand) {
    return this.commandBus.execute(createMembershipLevelCommand);
  }

  findByName(name: string) {
    return this.queryBus.execute(new GetMembershipsLevelByNameQuery(name));
  }
}
