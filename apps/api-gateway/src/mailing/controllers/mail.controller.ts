import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendMailDto } from '../dtos/send-mail.dto';
import { MailService } from '../services/mail.service';

@ApiBearerAuth()
@ApiTags('Mail')
@Controller('api/v1/mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Send a mail',
  })
  async sendMail(@Body() sendMailDto: SendMailDto) {
    return this.mailService.sendMail(sendMailDto);
  }
}
