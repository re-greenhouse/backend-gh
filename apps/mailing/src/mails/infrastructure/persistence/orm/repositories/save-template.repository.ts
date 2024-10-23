import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EmailTemplateEntity } from '../entities/email-template.entity';
import { Template } from '../../../../domain/template';
import { SaveTemplateRepository } from '../../../../application/ports/save-template.repository';
import { TemplateMapper } from '../mapper/template.mapper';

@Injectable()
export class OrmSaveTemplateRepository implements SaveTemplateRepository {
  constructor(
    @InjectRepository(EmailTemplateEntity)
    private readonly templateRepositories: Repository<EmailTemplateEntity>,
  ) {}

  async save(template: Template): Promise<Template> {
    const persistenceModel = TemplateMapper.toPersistence(template);
    const entity = await this.templateRepositories.save(persistenceModel);
    return TemplateMapper.toDomain(entity);
  }
}
