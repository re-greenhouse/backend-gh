import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  MEMBERSHIPS_LEVEL_SERVICE_NAME,
  MembershipsLevelServiceClient,
} from '@app/common/types/memberships';
import { MEMBERSHIPS_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class MembershipLevelsService implements OnModuleInit {
  private membershipLevelService: MembershipsLevelServiceClient;

  constructor(
    @Inject(MEMBERSHIPS_SERVICE) private readonly client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.membershipLevelService =
      this.client.getService<MembershipsLevelServiceClient>(
        MEMBERSHIPS_LEVEL_SERVICE_NAME,
      );
  }

  findByName(name: string) {
    return this.membershipLevelService.findByName({ name: name });
  }
}
