import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { UpdateCompanyCommand } from './update-company.command';
import { FindCompaniesRepository } from '../ports/find-companies.repository';
import { CreateCompanyRepository } from '../ports/create-company.repository';
import { Company } from '../../domain/company';

@CommandHandler(UpdateCompanyCommand)
export class UpdateCompanyCommandHandler
  implements ICommandHandler<UpdateCompanyCommand>
{
  constructor(
    private readonly findCompanyRepository: FindCompaniesRepository,
    private readonly createCompanyRepository: CreateCompanyRepository,
  ) {}

  async execute(command: UpdateCompanyCommand): Promise<Company> {
    const company = await this.findCompanyRepository.findById(command.id);

    if (!company) {
      throw new GrpcNotFoundException(
        `There's no company with id '${command.id}'`,
      );
    }

    company.tin = command.tin ?? company.tin;
    company.logoUrl = command.logoUrl ?? company.logoUrl;
    company.name = command.name ?? company.name;

    return this.createCompanyRepository.save(company);
  }
}
