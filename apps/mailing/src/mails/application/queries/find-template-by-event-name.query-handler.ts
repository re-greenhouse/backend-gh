import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindTemplateByEventNameQuery } from './find-template-by-event-name.query';
import { Template } from '../../domain/template';
import { FindTemplateRepository } from '../ports/find-template.repository';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@QueryHandler(FindTemplateByEventNameQuery)
export class FindTemplateByEventNameQueryQueryHandler
  implements IQueryHandler<FindTemplateByEventNameQuery, Template>
{
  constructor(
    private readonly findTemplatesRepository: FindTemplateRepository,
  ) {}

  async execute(query: FindTemplateByEventNameQuery): Promise<Template> {
    const existingTemplate = await this.findTemplatesRepository.findByEventName(
      query.eventName,
    );

    if (!existingTemplate) {
      throw new GrpcNotFoundException(
        `Template with event name ${query.eventName} not found`,
      );
    }

    return existingTemplate;
  }
}
