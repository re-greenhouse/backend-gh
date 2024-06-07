import { GetCompanyByProfileIdQuery } from './get-company-by-profile-id.query';
import { FindCompaniesRepository } from '../ports/find-companies.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Company } from '../../domain/company';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@QueryHandler(GetCompanyByProfileIdQuery)
export class GetCompanyByProfileIdQueryHandler
  implements IQueryHandler<GetCompanyByProfileIdQuery, Company | undefined>
{
  constructor(
    private readonly findCompaniesRepository: FindCompaniesRepository,
  ) {}

  async execute(
    query: GetCompanyByProfileIdQuery,
  ): Promise<Company | undefined> {
    const company: Company | undefined =
      await this.findCompaniesRepository.findByProfileId(query.profileId);

    if (!company) {
      throw new GrpcNotFoundException(
        `Profile with id '${query.profileId}' doesn't belong to a company.`,
      );
    }

    return company;
  }
}
