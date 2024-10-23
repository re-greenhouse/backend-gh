import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Mail } from '../domain/mail';
import { Resend } from 'resend';

@Injectable()
export class ResendFacadeService {
  private readonly resendClient: Resend;

  constructor(private readonly configService: ConfigService) {
    this.resendClient = new Resend(
      this.configService.get<string>('RESEND_API_KEY'),
    );
  }

  async sendMail(email: string, mail: Mail) {
    return await this.resendClient.emails.send({
      from: 'mailing@mailing.integradis.shop',
      to: email,
      subject: mail.subject,
      html: mail.body,
    });
  }
}
