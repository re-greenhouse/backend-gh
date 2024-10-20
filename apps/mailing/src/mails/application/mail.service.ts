import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { MailPayloadDto } from '@app/common/types/mailing';

@Injectable()
export class MailService {
  constructor(private eventEmitter: EventEmitter2) {}

  sendMail(request: MailPayloadDto) {
    this.eventEmitter.emit(
      request.eventName,
      request.email,
      request.payloadVariables,
    );
    return { success: true };
  }
}
