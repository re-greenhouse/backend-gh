import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCompanyCommand } from './commands/create-company.command';
import { GetCompanyByProfileIdQuery } from './queries/get-company-by-profile-id.query';
import { Profile } from '../domain/profile';
import { AddEmployeeCommand } from './commands/add-employee.command';
import { UpdateCompanyCommand } from './commands/update-company.command';
import { ExistCompanyWithTinQuery } from './queries/exist-company-with-tin.query';

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

  existByTin(tin: string) {
    return this.queryBus.execute(new ExistCompanyWithTinQuery(tin));
  }

  addEmployee(addEmployeeCommand: AddEmployeeCommand): Promise<Profile> {
    return this.commandBus.execute(addEmployeeCommand);
  }

  updateCompany(updateCompanyCommand: UpdateCompanyCommand) {
    return this.commandBus.execute(updateCompanyCommand);
  }
}
