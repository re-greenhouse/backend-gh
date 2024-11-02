import { QueryBus } from '@nestjs/cqrs';
import { GetMembershipsLevelByNameQuery } from './queries/get-memberships-level-by-name.query';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MembershipLevelService {
  constructor(private readonly queryBus: QueryBus) {}

  findByName(name: string) {
    return this.queryBus.execute(new GetMembershipsLevelByNameQuery(name));
  }
}
