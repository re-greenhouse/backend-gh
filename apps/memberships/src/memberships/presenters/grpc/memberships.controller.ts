import {
  CreateMembershipDto,
  FindMembershipByCompanyDto,
  Membership,
  MembershipsServiceController,
  MembershipsServiceControllerMethods,
  UpdateMembershipDto,
} from '@app/common/types/memberships';
import { Controller } from '@nestjs/common';
import { MembershipsService } from '../../application/memberships.service';
import { CreateMembershipCommand } from '../../application/commands/create-membership.command';
import { Observable } from 'rxjs';
import { UpdateMembershipCommand } from '../../application/commands/update-membership.command';

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
  async findByCompanyId(
    request: FindMembershipByCompanyDto,
  ): Promise<Membership> {
    return await this.membershipsService.findByCompanyId(request.companyId);
  }

  async updateMembership(
    updateMembershipDto: UpdateMembershipDto,
  ): Promise<Membership> {
    return this.membershipsService.update(
      new UpdateMembershipCommand(
        updateMembershipDto.id,
        updateMembershipDto.membershipLevelName,
      ),
    );
  }
}
