import {
  FindMembershipsLevelByNameDto,
  MembershipLevel,
  MembershipsLevelServiceController,
  MembershipsLevelServiceControllerMethods,
} from '@app/common/types/memberships';
import { Controller } from '@nestjs/common';
import { MembershipLevelService } from '../../application/membership-level.service';

@Controller()
@MembershipsLevelServiceControllerMethods()
export class MembershipLevelsController
  implements MembershipsLevelServiceController
{
  constructor(
    private readonly membershipLevelService: MembershipLevelService,
  ) {}

  async findByName(
    request: FindMembershipsLevelByNameDto,
  ): Promise<MembershipLevel> {
    return await this.membershipLevelService.findByName(request.name);
  }
}
