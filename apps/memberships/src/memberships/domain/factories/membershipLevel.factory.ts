import { Benefit } from '../value_objects/benefit';
import { MembershipLevel } from '../membershipLevel';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MembershipLevelFactory {
  create(name: string, benefits: Benefit[]): MembershipLevel {
    const membershipLevelId = randomUUID();
    const membershipLevel = new MembershipLevel(membershipLevelId);
    membershipLevel.name = name;
    membershipLevel.benefits = benefits;

    return membershipLevel;
  }
}
