import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Membership } from '../membership';
import { MembershipLevelName } from '../../infrastructure/persistence/orm/enums/membership.level.name.enum';
import { MembershipStatus } from '../../infrastructure/persistence/orm/enums/membership.status.enum';

@Injectable()
export class MembershipFactory {
  create(
    membershipLevelName: MembershipLevelName,
    companyId: string,
    startDate: string,
    endDate: string,
  ): Membership {
    const membershipId = randomUUID();
    const membership = new Membership(membershipId);
    membership.membershipLevelName = membershipLevelName;
    membership.companyId = companyId;
    membership.startDate = startDate;
    membership.endDate = endDate;
    membership.status = MembershipStatus.Active;

    return membership;
  }
}
