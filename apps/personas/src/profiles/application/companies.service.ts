import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCompanyCommand } from './commands/create-company.command';
import { GetCompanyByProfileIdQuery } from './queries/get-company-by-profile-id.query';

@Injectable()
export class CompaniesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(createCompanyCommand: CreateCompanyCommand) {
    return this.commandBus.execute(createCompanyCommand);
  }

  findOneByProfileId(profileId: string) {
    return this.queryBus.execute(new GetCompanyByProfileIdQuery(profileId));
  }
}
