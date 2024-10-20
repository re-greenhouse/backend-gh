import { Template } from '../../domain/template';

export abstract class SaveTemplateRepository {
  abstract save(template: Template): Promise<Template>;
}
