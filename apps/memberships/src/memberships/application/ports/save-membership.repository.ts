import { Membership } from '../../domain/membership';

export abstract class SaveMembershipRepository {
  abstract save(membership: Membership): Promise<Membership>;
}
