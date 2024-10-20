import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  TEMPLATE_SERVICE_NAME,
  TemplateServiceClient,
} from '@app/common/types/mailing';
import { MAILING_SERVICE } from '../constants';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateTemplateDto } from '../dtos/create-template.dto';
import { UpdateTemplateDto } from '../dtos/update-template.dto';

@Injectable()
export class TemplateService implements OnModuleInit {
  private templateService: TemplateServiceClient;

  constructor(@Inject(MAILING_SERVICE) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.templateService = this.client.getService<TemplateServiceClient>(
      TEMPLATE_SERVICE_NAME,
    );
  }

  create(createTemplateDto: CreateTemplateDto) {
    return this.templateService.create(createTemplateDto);
  }

  findAll() {
    return this.templateService.findAll({});
  }

  findByEventName(eventName: string) {
    return this.templateService.findOneByEventName({ eventName: eventName });
  }

  findById(id: string) {
    return this.templateService.findOne({ id: id });
  }

  remove(id: string) {
    return this.templateService.remove({ id: id });
  }

  update(id: string, updateTemplateDto: UpdateTemplateDto) {
    return this.templateService.update({ id: id, ...updateTemplateDto });
  }
}
