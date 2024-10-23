import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GrpcCancelledException } from 'nestjs-grpc-exceptions';
import { CreateTemplateCommand } from './create-template.command';
import { FindTemplateRepository } from '../ports/find-template.repository';
import { SaveTemplateRepository } from '../ports/save-template.repository';
import { TemplateFactory } from '../../domain/factories/template.factory';
import { Template } from '../../domain/template';

@CommandHandler(CreateTemplateCommand)
export class CreateTemplateCommandHandler
  implements ICommandHandler<CreateTemplateCommand>
{
  constructor(
    private readonly templateFactory: TemplateFactory,
    private readonly findTemplatesRepository: FindTemplateRepository,
    private readonly saveTemplateRepository: SaveTemplateRepository,
  ) {}

  async execute(command: CreateTemplateCommand): Promise<Template> {
    if (
      (await this.findTemplatesRepository.findByEventName(
        command.eventName,
      )) !== undefined
    ) {
      throw new GrpcCancelledException(
        `Template with event name '${command.eventName}' already exists`,
      );
    }

    const template = this.templateFactory.create(
      command.eventName,
      command.subject,
      command.body,
    );

    return this.saveTemplateRepository.save(template);
  }
}
