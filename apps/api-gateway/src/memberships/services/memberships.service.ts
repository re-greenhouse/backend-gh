import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  MEMBERSHIPS_SERVICE_NAME,
  MembershipsServiceClient,
} from '@app/common/types/memberships';
import { MEMBERSHIPS_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateMembershipDto } from '../dto/create-membership.dto';

@Injectable()
export class MembershipsService implements OnModuleInit {
  private membershipsService: MembershipsServiceClient;

  constructor(
    @Inject(MEMBERSHIPS_SERVICE) private readonly client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.membershipsService = this.client.getService<MembershipsServiceClient>(
      MEMBERSHIPS_SERVICE_NAME,
    );
  }

  create(createMembershipDto: CreateMembershipDto) {
    return this.membershipsService.createMembership({
      membershipLevelName: createMembershipDto.membershipLevelName,
      companyId: createMembershipDto.companyId,
      startDate: createMembershipDto.startDate,
      endDate: createMembershipDto.endDate,
    });
  }

  findByCompany(companyId: string) {
    return this.membershipsService.findByCompany({ companyId: companyId });
  }
}
