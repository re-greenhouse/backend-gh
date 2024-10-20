import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllTemplatesQuery } from './find-all-templates.query';
import { Template } from '../../domain/template';
import { FindTemplateRepository } from '../ports/find-template.repository';

@QueryHandler(FindAllTemplatesQuery)
export class FindAllTemplatesQueryHandler
  implements IQueryHandler<FindAllTemplatesQuery, Array<Template>>
{
  constructor(
    private readonly findTemplatesRepository: FindTemplateRepository,
  ) {}

  async execute(query: FindAllTemplatesQuery): Promise<Array<Template>> {
    return this.findTemplatesRepository.findAll();
  }
}
