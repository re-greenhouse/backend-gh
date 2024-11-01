import { FindCompaniesRepository } from '../ports/find-companies.repository';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ExistCompanyWithTinQuery } from './exist-company-with-tin.query';
import { Exist } from '@app/common/types/personas';

@QueryHandler(ExistCompanyWithTinQuery)
export class ExistCompanyWithTinQueryHandler
  implements IQueryHandler<ExistCompanyWithTinQuery, Exist>
{
  constructor(
    private readonly findCompaniesRepository: FindCompaniesRepository,
  ) {}

  async execute(query: ExistCompanyWithTinQuery): Promise<Exist> {
    const response = await this.findCompaniesRepository.existByTin(query.tin);
    return {
      exist: response,
    };
  }
}
