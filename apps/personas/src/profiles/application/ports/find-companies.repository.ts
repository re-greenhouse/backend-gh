import { Company } from '../../domain/company';

export abstract class FindCompaniesRepository {
  abstract findAll(): Promise<Array<Company>>;
  abstract findById(id: string): Promise<Company | undefined>;
  abstract findByProfileId(profileId: string): Promise<Company | undefined>;
  abstract existByTin(tin: string): Promise<boolean>;
}
