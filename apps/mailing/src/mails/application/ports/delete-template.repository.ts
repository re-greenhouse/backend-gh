import { Template } from '../../domain/template';

export abstract class DeleteTemplateRepository {
  abstract delete(template: Template): Promise<Template>;
}
