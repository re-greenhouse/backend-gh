import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FindCompaniesRepository } from '../ports/find-companies.repository';
import { AddEmployeeCommand } from './add-employee.command';
import {
  GrpcCancelledException,
  GrpcNotFoundException,
} from 'nestjs-grpc-exceptions';
import { FindProfilesRepository } from '../ports/find-profiles.repository';
import { CreateProfileRepository } from '../ports/create-profile.repository';

@CommandHandler(AddEmployeeCommand)
export class AddEmployeeCommandHandler
  implements ICommandHandler<AddEmployeeCommand>
{
  constructor(
    private readonly findCompaniesRepository: FindCompaniesRepository,
    private readonly findProfilesRepository: FindProfilesRepository,
    private readonly createProfileRepository: CreateProfileRepository,
  ) {}

  async execute(command: AddEmployeeCommand): Promise<any> {
    const company = await this.findCompaniesRepository.findById(
      command.companyId,
    );

    if (company === undefined) {
      throw new GrpcNotFoundException(
        `Company with id '${command.companyId}' doesn't exist.`,
      );
    }

    const employee = await this.findProfilesRepository.findById(
      command.employeeId,
    );

    if (employee === undefined) {
      throw new GrpcNotFoundException(
        `Employee profile with id '${command.employeeId}' doesn't exist.`,
      );
    }

    if (employee.company !== null) {
      throw new GrpcCancelledException(
        `Employee profile with id '${command.employeeId}' already belongs to a company`,
      );
    }

    employee.company = company;
    return this.createProfileRepository.save(employee);
  }
}
