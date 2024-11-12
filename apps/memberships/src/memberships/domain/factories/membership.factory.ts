import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { MembershipLevel } from '../membershipLevel';
import { MembershipPayment } from '../membershipPayment';
import { Company } from '@app/common/types/personas';
import { Membership } from '../membership';
import { MembershipStatus } from '../../infrastructure/persistence/orm/enums/membership.status.enum';

@Injectable()
export class MembershipFactory {
  create(
    membershipLevelName: string,
    companyId: string,
    startDate: string,
    endDate: string,
    status: MembershipStatus,
  ): Membership {
    const membershipId = randomUUID();
    const membership = new Membership(membershipId);
    membership.membershipLevelName = membershipLevelName;
    membership.companyId = companyId;
    membership.startDate = startDate;
    membership.endDate = endDate;
    membership.status = status;

    return membership;
  }
}
