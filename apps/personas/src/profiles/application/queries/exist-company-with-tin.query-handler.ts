import { FindCompaniesRepository } from '../ports/find-companies.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExistCompanyWithTinQuery } from './exist-company-with-tin.query';
import { Exist } from '@app/common/types/personas';

@QueryHandler(ExistCompanyWithTinQuery)
export class ExistCompanyWithTinQueryHandler
  implements IQueryHandler<ExistCompanyWithTinQuery, Exist | undefined>
{
  constructor(
    private readonly findCompaniesRepository: FindCompaniesRepository,
  ) {}

  async execute(query: ExistCompanyWithTinQuery): Promise<Exist | undefined> {
    return {
      exist: await this.findCompaniesRepository.existByTin(query.tin),
    };
  }
}
