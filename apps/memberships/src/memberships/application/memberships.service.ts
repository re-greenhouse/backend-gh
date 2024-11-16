import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMembershipCommand } from './commands/create-membership.command';
import { Injectable } from '@nestjs/common';
import { GetMembershipsByCompanyQuery } from './queries/get-memberships-by-company.query';

@Injectable()
export class MembershipsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createMembershipCommand: CreateMembershipCommand) {
    return this.commandBus.execute(createMembershipCommand);
  }

  findByCompanyId(companyId: string) {
    return this.queryBus.execute(new GetMembershipsByCompanyQuery(companyId));
  }
}
