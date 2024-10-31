import {
  CreateMembershipDto,
  FindMembershipByCompany,
  Membership,
  MembershipsServiceController,
  MembershipsServiceControllerMethods,
} from '@app/common/types/memberships';
import { Controller } from '@nestjs/common';
import { MembershipsService } from '../application/memberships.service';
import { CreateMembershipCommand } from '../application/commands/create-membership.command';

@Controller()
@MembershipsServiceControllerMethods()
export class MembershipsController implements MembershipsServiceController {
  constructor(private readonly membershipsService: MembershipsService) {}

  async createMembership(request: CreateMembershipDto): Promise<Membership> {
    return this.membershipsService.create(
      new CreateMembershipCommand(
        request.membershipLevelName,
        request.companyId,
        request.startDate,
        request.endDate,
      ),
    );
  }
  async findByCompany(request: FindMembershipByCompany): Promise<Membership> {
    return await this.membershipsService.findByCompany(request.companyId);
  }
}
