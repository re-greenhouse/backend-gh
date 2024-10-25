import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Template } from '../template';

@Injectable()
export class TemplateFactory {
  create(eventName: string, subject: string, body: string): Template {
    const id = randomUUID();
    const template: Template = new Template(id, eventName, subject, body);
    return template;
  }
}
