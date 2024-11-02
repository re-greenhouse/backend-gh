import {
  FindMembershipsLevelByName,
  MembershipLevel,
  MembershipsLevelServiceController,
} from '@app/common/types/memberships';
import { Controller } from '@nestjs/common';
import { CropsServiceControllerMethods } from '@app/common/types/crops';
import { MembershipLevelService } from '../application/membership-level.service';

@Controller()
@CropsServiceControllerMethods()
export class MembershipLevelsController
  implements MembershipsLevelServiceController
{
  constructor(
    private readonly membershipLevelService: MembershipLevelService,
  ) {}

  async findByName(
    request: FindMembershipsLevelByName,
  ): Promise<MembershipLevel> {
    return await this.membershipLevelService.findByName(request.name);
  }
}
