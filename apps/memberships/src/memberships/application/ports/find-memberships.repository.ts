import { Company } from 'apps/personas/src/profiles/domain/company';
import { Membership } from '../../domain/membership';

export abstract class FindMembershipsRepository {
  abstract findAll(): Promise<Array<Membership>>;
  abstract findByCompany(company: Company): Promise<Membership | undefined>;
  abstract findById(id: string): Promise<Membership | undefined>;
}
