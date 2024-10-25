import { Membership } from '../../domain/membership';

export abstract class CreateMembershipRepository {
  abstract save(membership: Membership): Promise<Membership>;
}
