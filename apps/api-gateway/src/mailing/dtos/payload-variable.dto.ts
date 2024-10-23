import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PayloadVariableDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  variable: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  value: string;
}
