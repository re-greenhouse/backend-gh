import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMembershipCommand } from './commands/create-membership.command';
import { Injectable } from '@nestjs/common';
import { GetMembershipsByCompanyQuery } from './queries/get-memberships-by-company.query';
import { UpdateMembershipCommand } from './commands/update-membership.command';
import { Membership } from '../domain/membership';

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

  update(
    updateMembershipCommand: UpdateMembershipCommand,
  ): Promise<Membership> {
    return this.commandBus.execute(updateMembershipCommand);
  }
}
