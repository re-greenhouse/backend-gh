import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MAILING_SERVICE } from './constants';
import { join } from 'path';
import { SharedModule } from '../shared/shared.module';
import { MAILING_PACKAGE_NAME } from '@app/common/types/mailing';
import { MailController } from './controllers/mail.controller';
import { MailService } from './services/mail.service';
import { TemplateController } from './controllers/template.controller';
import { TemplateService } from './services/template.service';
import { MailFacadeService } from './facade/mail-facade.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MAILING_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: MAILING_PACKAGE_NAME,
          protoPath: join(__dirname, '../mailing.proto'),
          url: 'localhost:5003',
        },
      },
    ]),
    SharedModule,
  ],
  controllers: [MailController, TemplateController],
  providers: [MailService, TemplateService, MailFacadeService],
  exports: [MailFacadeService],
})
export class MailingModule {}
