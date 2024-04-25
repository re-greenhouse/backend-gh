import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProfileByUserIdQuery } from './get-profile-by-user-id.query';
import { Profile } from '../../domain/profile';
import { FindProfilesRepository } from '../ports/find-profiles.repository';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@QueryHandler(GetProfileByUserIdQuery)
export class GetProfileByIdQueryHandler
  implements IQueryHandler<GetProfileByUserIdQuery, Profile | undefined>
{
  constructor(
    private readonly findProfilesRepository: FindProfilesRepository,
  ) {}

  async execute(query: GetProfileByUserIdQuery): Promise<Profile> {
    const profile = await this.findProfilesRepository.findByUserId(
      query.userId,
    );

    if (!profile) {
      throw new GrpcNotFoundException(
        `Profile for user with id: ${query.userId} not found`,
      );
    }

    return profile;
  }
}
