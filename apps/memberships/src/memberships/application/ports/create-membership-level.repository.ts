import { MembershipLevel } from '../../domain/membershipLevel';

export abstract class CreateMembershipLevelRepository {
  abstract save(membershipLevel: MembershipLevel): Promise<MembershipLevel>;
}
