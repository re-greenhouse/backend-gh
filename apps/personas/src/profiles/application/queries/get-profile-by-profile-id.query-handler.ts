import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Profile } from '@app/common/types/personas';
import { GetProfileByProfileIdQuery } from './get-profile-by-profile-id.query';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { FindProfilesRepository } from '../ports/find-profiles.repository';

@QueryHandler(GetProfileByProfileIdQuery)
export class GetProfileByProfileIdQueryHandler
  implements IQueryHandler<GetProfileByProfileIdQuery, Profile>
{
  constructor(
    private readonly findProfilesRepository: FindProfilesRepository,
  ) {}

  async execute(query: GetProfileByProfileIdQuery): Promise<Profile> {
    const profile = await this.findProfilesRepository.findById(query.profileId);

    if (!profile) {
      throw new GrpcNotFoundException(
        `Profile with id: ${query.profileId} not found`,
      );
    }

    return profile;
  }
}
