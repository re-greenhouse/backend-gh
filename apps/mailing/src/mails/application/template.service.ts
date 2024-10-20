import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Template, Templates } from '@app/common/types/mailing';
import { CreateTemplateCommand } from './commands/create-template.command';
import { FindAllTemplatesQuery } from './queries/find-all-templates.query';
import { FindTemplateByIdQuery } from './queries/find-template-by-id.query';
import { FindTemplateByEventNameQuery } from './queries/find-template-by-event-name.query';
import { DeleteTemplateCommand } from './commands/delete-template.command';
import { UpdateTemplateCommand } from './commands/update-template.command';

@Injectable()
export class TemplateService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(command: CreateTemplateCommand): Promise<Template> {
    return this.commandBus.execute(command);
  }

  findAll(): Promise<Templates> {
    return this.queryBus.execute(new FindAllTemplatesQuery());
  }

  findOne(id: string): Promise<Template> {
    return this.queryBus.execute(new FindTemplateByIdQuery(id));
  }

  findOneByEventName(eventName: string): Promise<Template> {
    return this.queryBus.execute(new FindTemplateByEventNameQuery(eventName));
  }

  remove(command: DeleteTemplateCommand): Promise<Template> {
    return this.commandBus.execute(command);
  }

  update(command: UpdateTemplateCommand): Promise<Template> {
    return this.commandBus.execute(command);
  }
}
