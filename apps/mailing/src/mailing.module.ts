import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { MailModule } from './mails/application/mail.module';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule.forRoot(), CoreModule, MailModule],
})
export class MailingModule {}
