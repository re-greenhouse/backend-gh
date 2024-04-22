import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCompanyCommand } from './create-company.command';
import { CompanyFactory } from '../../domain/factories/company.factory';
import { CreateCompanyRepository } from '../ports/create-company.repository';
import { Company } from '../../domain/company';
import { GrpcAlreadyExistsException } from 'nestjs-grpc-exceptions';
import { FindCompaniesRepository } from '../ports/find-companies.repository';
import { CreateProfileRepository } from '../ports/create-profile.repository';

@CommandHandler(CreateCompanyCommand)
export class CreateCompanyCommandHandler
  implements ICommandHandler<CreateCompanyCommand>
{
  constructor(
    private readonly companyFactory: CompanyFactory,
    private readonly createCompanyRepository: CreateCompanyRepository,
    private readonly findCompaniesRepository: FindCompaniesRepository,
    private readonly createProfileRepository: CreateProfileRepository,
  ) {}

  async execute(command: CreateCompanyCommand): Promise<Company> {
    if (command.owner.company !== null) {
      throw new GrpcAlreadyExistsException(
        `The user is already part of a company.`,
      );
    }

    if (await this.findCompaniesRepository.existByTin(command.tin)) {
      throw new GrpcAlreadyExistsException(
        `There's an existing company with the same tin`,
      );
    }

    const newCompany: Company = this.companyFactory.create(
      command.tin,
      command.name,
      command.logoUrl,
    );

    const savedCompany = await this.createCompanyRepository.save(newCompany);
    command.owner.company = savedCompany;
    await this.createProfileRepository.save(command.owner);
    return savedCompany;
  }
}
