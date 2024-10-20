import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindTemplateByIdQuery } from './find-template-by-id.query';
import { Template } from '../../domain/template';
import { FindTemplateRepository } from '../ports/find-template.repository';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@QueryHandler(FindTemplateByIdQuery)
export class FindTemplateByIdQueryHandler
  implements IQueryHandler<FindTemplateByIdQuery, Template>
{
  constructor(
    private readonly findTemplatesRepository: FindTemplateRepository,
  ) {}

  async execute(query: FindTemplateByIdQuery): Promise<Template> {
    const existingTemplate = await this.findTemplatesRepository.findById(
      query.id,
    );

    if (!existingTemplate) {
      throw new GrpcNotFoundException(`Template with id ${query.id} not found`);
    }

    return existingTemplate;
  }
}
