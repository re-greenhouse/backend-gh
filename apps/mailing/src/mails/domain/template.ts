import { Mail } from './mail';
import { PayloadVariable } from '@app/common/types/mailing';

export class Template {
  constructor(
    public id: string,
    public eventName: string,
    public subject: string,
    public body: string,
  ) {}

  buildMail(payload: Array<PayloadVariable>): Mail {
    const customSubject = this.subject;
    const customBody = this.body;

    payload.forEach(({ variable, value }) => {
      customSubject.replaceAll(`{{ ${variable} }}`, value);
      customBody.replaceAll(`{{ ${variable} }}`, value);
    });

    return new Mail(customSubject, customBody);
  }
}
