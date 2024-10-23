import { Template } from '../../domain/template';

export abstract class FindTemplateRepository {
  abstract findAll(): Promise<Array<Template>>;
  abstract findById(id: string): Promise<Template | undefined>;
  abstract findByEventName(eventName: string): Promise<Template | undefined>;
}
