import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCompanyCommand } from './commands/create-company.command';

@Injectable()
export class CompaniesService {
  constructor(private readonly commandBus: CommandBus) {}

  create(createCompanyCommand: CreateCompanyCommand) {
    return this.commandBus.execute(createCompanyCommand);
  }
}
