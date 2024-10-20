import { Controller } from '@nestjs/common';
import {
  MailingServiceController,
  MailingServiceControllerMethods,
  MailPayloadDto,
} from '@app/common/types/mailing';
import { MailService } from '../../application/mail.service';

@Controller()
@MailingServiceControllerMethods()
export class MailController implements MailingServiceController {
  constructor(private readonly mailService: MailService) {}

  sendMail(request: MailPayloadDto) {
    return this.mailService.sendMail(request);
  }
}
