import { MembershipLevel } from '../../domain/membershipLevel';

export abstract class FindMembershipLevelsRepository {
  abstract findByName(name: string): Promise<MembershipLevel | undefined>;
}
