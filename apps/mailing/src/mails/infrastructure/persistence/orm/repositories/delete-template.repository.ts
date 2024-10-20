import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EmailTemplateEntity } from '../entities/email-template.entity';
import { Template } from '../../../../domain/template';
import { TemplateMapper } from '../mapper/template.mapper';
import { DeleteTemplateRepository } from '../../../../application/ports/delete-template.repository';

@Injectable()
export class OrmDeleteTemplateRepository implements DeleteTemplateRepository {
  constructor(
    @InjectRepository(EmailTemplateEntity)
    private readonly templateRepositories: Repository<EmailTemplateEntity>,
  ) {}

  async delete(template: Template): Promise<Template> {
    const persistenceModel = TemplateMapper.toPersistence(template);
    const entity = await this.templateRepositories.remove(persistenceModel);
    return TemplateMapper.toDomain(entity);
  }
}
