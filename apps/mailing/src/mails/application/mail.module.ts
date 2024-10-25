import { Module } from '@nestjs/common';
import { UserRegisteredListener } from './listeners/user-registered.listener';
import { MailService } from './mail.service';
import { ResendFacadeService } from './resend-facade.service';
import { MailingInfrastructureModule } from '../infrastructure/persistence/mailing-infrastructure.module';
import { MailController } from '../presenters/grpc/mail.controller';
import { TemplateController } from '../presenters/grpc/template.controller';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TemplateService } from './template.service';
import { CreateTemplateCommand } from './commands/create-template.command';
import { DeleteTemplateCommand } from './commands/delete-template.command';
import { UpdateTemplateCommand } from './commands/update-template.command';
import { FindAllTemplatesQuery } from './queries/find-all-templates.query';
import { FindTemplateByEventNameQuery } from './queries/find-template-by-event-name.query';
import { TemplateFactory } from '../domain/factories/template.factory';
import { CreateTemplateCommandHandler } from './commands/create-template.command-handler';
import { DeleteTemplateCommandHandler } from './commands/delete-template.command-handler';
import { UpdateTemplateCommandHandler } from './commands/update-template.command-handler';
import { FindAllTemplatesQueryHandler } from './queries/find-all-templates.query-handler';
import { FindTemplateByIdQuery } from './queries/find-template-by-id.query';
import { FindTemplateByIdQueryHandler } from './queries/find-template-by-id.query-handler';
import { FindTemplateByEventNameQueryQueryHandler } from './queries/find-template-by-event-name.query-handler';
import { EmployeeInvitedListener } from './listeners/employee-invited.listener';

@Module({
  controllers: [MailController, TemplateController],
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    MailingInfrastructureModule,
  ],
  providers: [
    TemplateFactory,
    UserRegisteredListener,
    EmployeeInvitedListener,
    MailService,
    TemplateService,
    ResendFacadeService,
    CreateTemplateCommand,
    CreateTemplateCommandHandler,
    DeleteTemplateCommand,
    DeleteTemplateCommandHandler,
    UpdateTemplateCommand,
    UpdateTemplateCommandHandler,
    FindAllTemplatesQuery,
    FindAllTemplatesQueryHandler,
    FindTemplateByIdQuery,
    FindTemplateByIdQueryHandler,
    FindTemplateByEventNameQuery,
    FindTemplateByEventNameQueryQueryHandler,
  ],
})
export class MailModule {}
