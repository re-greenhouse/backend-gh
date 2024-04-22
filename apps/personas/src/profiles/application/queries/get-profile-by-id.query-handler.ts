import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProfileByUserIdQuery } from './get-profile-by-user-id.query';
import { Profile } from '../../domain/profile';
import { FindProfilesRepository } from '../ports/find-profiles.repository';

@QueryHandler(GetProfileByUserIdQuery)
export class GetProfileByIdQueryHandler
  implements IQueryHandler<GetProfileByUserIdQuery, Profile | undefined>
{
  constructor(
    private readonly findProfilesRepository: FindProfilesRepository,
  ) {}

  async execute(query: GetProfileByUserIdQuery): Promise<Profile | undefined> {
    return await this.findProfilesRepository.findByUserId(query.userId);
  }
}
