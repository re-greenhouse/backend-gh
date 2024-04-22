import { Company } from '../../domain/company';

export abstract class CreateCompanyRepository {
  abstract save(company: Company): Promise<Company>;
}
