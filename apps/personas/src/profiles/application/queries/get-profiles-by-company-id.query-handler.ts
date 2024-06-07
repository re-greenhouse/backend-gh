import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Profile } from '../../domain/profile';
import { FindProfilesRepository } from '../ports/find-profiles.repository';
import { GetProfilesByCompanyIdQuery } from './get-profiles-by-company-id.query';

@QueryHandler(GetProfilesByCompanyIdQuery)
export class GetProfilesByCompanyIdQueryHandler
  implements IQueryHandler<GetProfilesByCompanyIdQuery, Array<Profile>>
{
  constructor(
    private readonly findProfilesRepository: FindProfilesRepository,
  ) {}

  async execute(query: GetProfilesByCompanyIdQuery): Promise<Array<Profile>> {
    return await this.findProfilesRepository.findByCompanyId(query.companyId);
  }
}
