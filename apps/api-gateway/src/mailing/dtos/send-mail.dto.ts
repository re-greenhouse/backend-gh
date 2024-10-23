import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { PayloadVariableDto } from './payload-variable.dto';

export class SendMailDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsArray()
  payloadVariables: Array<PayloadVariableDto>;
}
