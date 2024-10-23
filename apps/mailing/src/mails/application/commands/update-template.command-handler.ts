import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { FindTemplateRepository } from '../ports/find-template.repository';
import { Template } from '../../domain/template';
import { UpdateTemplateCommand } from './update-template.command';
import { SaveTemplateRepository } from '../ports/save-template.repository';

@CommandHandler(UpdateTemplateCommand)
export class UpdateTemplateCommandHandler
  implements ICommandHandler<UpdateTemplateCommand>
{
  constructor(
    private readonly findTemplatesRepository: FindTemplateRepository,
    private readonly saveTemplateRepository: SaveTemplateRepository,
  ) {}

  async execute(command: UpdateTemplateCommand): Promise<Template> {
    const existingTemplate = await this.findTemplatesRepository.findById(
      command.id,
    );

    if (!existingTemplate) {
      throw new GrpcNotFoundException(
        `Template with id '${command.id}' not found`,
      );
    }

    existingTemplate.body ??= command.body;
    existingTemplate.subject ??= command.subject;

    return this.saveTemplateRepository.save(existingTemplate);
  }
}
