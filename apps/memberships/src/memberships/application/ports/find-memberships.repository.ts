import { Membership } from '../../domain/membership';

export abstract class FindMembershipsRepository {
  abstract findAll(): Promise<Array<Membership>>;
  abstract findByCompany(companyId: string): Promise<Membership | undefined>;
  abstract findById(id: string): Promise<Membership | undefined>;
}
