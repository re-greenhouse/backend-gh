import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EmailTemplateEntity } from '../entities/email-template.entity';
import { FindTemplateRepository } from '../../../../application/ports/find-template.repository';
import { Template } from '../../../../domain/template';
import { TemplateMapper } from '../mapper/template.mapper';

@Injectable()
export class OrmFindTemplateRepository implements FindTemplateRepository {
  constructor(
    @InjectRepository(EmailTemplateEntity)
    private readonly templateRepositories: Repository<EmailTemplateEntity>,
  ) {}

  async findAll(): Promise<Array<Template>> {
    const persistenceEntities = await this.templateRepositories.find();
    return persistenceEntities.map((entity) => TemplateMapper.toDomain(entity));
  }

  async findByEventName(eventName: string): Promise<Template | undefined> {
    const templateEntity = await this.templateRepositories.findOneBy({
      eventName: eventName,
    });
    return templateEntity ? TemplateMapper.toDomain(templateEntity) : undefined;
  }

  async findById(id: string): Promise<Template | undefined> {
    const templateEntity = await this.templateRepositories.findOneBy({
      id: id,
    });
    return templateEntity ? TemplateMapper.toDomain(templateEntity) : undefined;
  }
}
