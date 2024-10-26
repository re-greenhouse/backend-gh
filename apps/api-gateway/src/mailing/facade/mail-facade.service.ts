import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { MAILING_SERVICE } from '../constants';
import {
  MAILING_SERVICE_NAME,
  MailingServiceClient,
} from '@app/common/types/mailing';
import { SendMailDto } from '../dtos/send-mail.dto';

@Injectable()
export class MailFacadeService implements OnModuleInit {
  private mailService: MailingServiceClient;

  constructor(@Inject(MAILING_SERVICE) private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.mailService =
      this.client.getService<MailingServiceClient>(MAILING_SERVICE_NAME);
  }

  sendMail(sendMailDto: SendMailDto) {
    return this.mailService.sendMail(sendMailDto);
  }
}
