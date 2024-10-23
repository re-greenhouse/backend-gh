import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { FindTemplateRepository } from '../ports/find-template.repository';
import { Template } from '../../domain/template';
import { DeleteTemplateCommand } from './delete-template.command';
import { DeleteTemplateRepository } from '../ports/delete-template.repository';

@CommandHandler(DeleteTemplateCommand)
export class DeleteTemplateCommandHandler
  implements ICommandHandler<DeleteTemplateCommand>
{
  constructor(
    private readonly findTemplatesRepository: FindTemplateRepository,
    private readonly deleteTemplateRepository: DeleteTemplateRepository,
  ) {}

  async execute(command: DeleteTemplateCommand): Promise<Template> {
    const existingTemplate = await this.findTemplatesRepository.findById(
      command.id,
    );

    if (!existingTemplate) {
      throw new GrpcNotFoundException(
        `Template with id '${command.id}' not found`,
      );
    }

    return this.deleteTemplateRepository.delete(existingTemplate);
  }
}
