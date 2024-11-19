import { IsNotEmpty } from 'class-validator';

export class UpdateRecordDto {
  @IsNotEmpty()
  payload: any;
}
