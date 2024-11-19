import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  MEMBERSHIPS_LEVEL_SERVICE_NAME,
  MembershipsLevelServiceClient,
} from '@app/common/types/memberships';
import { MEMBERSHIPS_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateMembershipLevelDto } from '../dto/create-membership-level.dto';

@Injectable()
export class MembershipLevelsService implements OnModuleInit {
  private membershipLevelsService: MembershipsLevelServiceClient;

  constructor(
    @Inject(MEMBERSHIPS_SERVICE) private readonly client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.membershipLevelsService =
      this.client.getService<MembershipsLevelServiceClient>(
        MEMBERSHIPS_LEVEL_SERVICE_NAME,
      );
  }

  create(createMembershipLevelDto: CreateMembershipLevelDto) {
    return this.membershipLevelsService.createMembershipLevel({
      name: createMembershipLevelDto.name,
      benefits: createMembershipLevelDto.benefits,
    });
  }

  findByName(name: string) {
    return this.membershipLevelsService.findByName({
      name: name,
    });
  }
}
