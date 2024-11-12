import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMembershipsLevelByNameQuery } from './get-memberships-level-by-name.query';
import { MembershipLevel } from '../../domain/membershipLevel';
import { FindMembershipLevelsRepository } from '../ports/find-membership-levels.repository';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@QueryHandler(GetMembershipsLevelByNameQuery)
export class GetMembershipsLevelByNameQueryHandler
  implements
    IQueryHandler<GetMembershipsLevelByNameQuery, MembershipLevel | undefined>
{
  constructor(
    private readonly findMembershipsLevelRepository: FindMembershipLevelsRepository,
  ) {}

  async execute(
    query: GetMembershipsLevelByNameQuery,
  ): Promise<MembershipLevel> {
    const membershipLevel =
      await this.findMembershipsLevelRepository.findByName(query.name);
    if (membershipLevel === undefined) {
      throw new GrpcNotFoundException(
        `Membership Level ${query.name} doesn't exist`,
      );
    }
    return membershipLevel;
  }
}
