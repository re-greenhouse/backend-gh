import {
  CreateMembershipLevelDto,
  FindMembershipsLevelByNameDto,
  MembershipLevel,
  MembershipsLevelServiceController,
  MembershipsLevelServiceControllerMethods,
} from '@app/common/types/memberships';
import { Controller } from '@nestjs/common';
import { MembershipLevelService } from '../../application/membership-level.service';
import { CreateMembershipLevelCommand } from '../../application/commands/create-membership-level.command';

@Controller()
@MembershipsLevelServiceControllerMethods()
export class MembershipLevelsController
  implements MembershipsLevelServiceController
{
  constructor(
    private readonly membershipLevelService: MembershipLevelService,
  ) {}

  async createMembershipLevel(
    request: CreateMembershipLevelDto,
  ): Promise<MembershipLevel> {
    return this.membershipLevelService.create(
      new CreateMembershipLevelCommand(request.name, request.benefits),
    );
  }

  async findByName(
    request: FindMembershipsLevelByNameDto,
  ): Promise<MembershipLevel> {
    return await this.membershipLevelService.findByName(request.name);
  }
}
