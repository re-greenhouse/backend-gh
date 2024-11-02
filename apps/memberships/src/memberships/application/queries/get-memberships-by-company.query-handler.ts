import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMembershipsByCompanyQuery } from './get-memberships-by-company.query';
import { Membership } from '../../domain/membership';
import { FindMembershipsRepository } from '../ports/find-memberships.repository';

@QueryHandler(GetMembershipsByCompanyQuery)
export class GetMembershipsByCompanyQueryHandler
  implements
    IQueryHandler<GetMembershipsByCompanyQuery, Membership | undefined>
{
  constructor(
    private readonly findMembershipsRepository: FindMembershipsRepository,
  ) {}

  async execute(query: GetMembershipsByCompanyQuery): Promise<Membership> {
    return await this.findMembershipsRepository.findByCompany(query.companyId);
  }
}
