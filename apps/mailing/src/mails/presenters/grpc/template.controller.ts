import { Controller } from '@nestjs/common';
import {
  TemplateServiceControllerMethods,
  TemplateServiceController,
  CreateTemplateDto,
  Template,
  FindAllTemplatesDto,
  Templates,
  FindOneTemplateDto,
  FindOneTemplateByEventNameDto,
  UpdateTemplateDto,
} from '@app/common/types/mailing';
import { TemplateService } from '../../application/template.service';
import { CreateTemplateCommand } from '../../application/commands/create-template.command';
import { DeleteTemplateCommand } from '../../application/commands/delete-template.command';
import { UpdateTemplateCommand } from '../../application/commands/update-template.command';

@Controller()
@TemplateServiceControllerMethods()
export class TemplateController implements TemplateServiceController {
  constructor(private readonly templateService: TemplateService) {}

  create(request: CreateTemplateDto): Promise<Template> {
    return this.templateService.create(
      new CreateTemplateCommand(
        request.eventName,
        request.subject,
        request.body,
      ),
    );
  }

  findAll(_: FindAllTemplatesDto): Promise<Templates> {
    return this.templateService.findAll();
  }

  findOne(request: FindOneTemplateDto): Promise<Template> {
    return this.templateService.findOne(request.id);
  }

  findOneByEventName(
    request: FindOneTemplateByEventNameDto,
  ): Promise<Template> {
    return this.templateService.findOneByEventName(request.eventName);
  }

  remove(request: FindOneTemplateDto): Promise<Template> {
    return this.templateService.remove(new DeleteTemplateCommand(request.id));
  }

  update(request: UpdateTemplateDto): Promise<Template> {
    return this.templateService.update(
      new UpdateTemplateCommand(request.id, request.subject, request.body),
    );
  }
}
