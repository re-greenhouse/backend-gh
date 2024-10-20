import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResendFacadeService {
  private readonly resendClient: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resendClient = new Resend(
      this.configService.get<string>('RESEND_API_KEY'),
    );
  }

  async sendMail(email: string, template: string) {
    return await this.resendClient.emails.send({
      from: 'mailing@greenhouse.com',
      to: email,
      subject: 'hello world',
      text: 'it works!',
    });
  }
}
