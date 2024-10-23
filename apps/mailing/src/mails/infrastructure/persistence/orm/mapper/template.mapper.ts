import { EmailTemplateEntity } from '../entities/email-template.entity';
import { Template } from '../../../../domain/template';

export class TemplateMapper {
  static toDomain(templateEntity: EmailTemplateEntity): Template {
    return new Template(
      templateEntity.id,
      templateEntity.eventName,
      templateEntity.subject,
      templateEntity.body,
    );
  }

  static toPersistence(template: Template): EmailTemplateEntity {
    const emailEntity = new EmailTemplateEntity();

    emailEntity.id = template.id;
    emailEntity.eventName = template.eventName;
    emailEntity.subject = template.subject;
    emailEntity.body = template.body;

    return emailEntity;
  }
}
