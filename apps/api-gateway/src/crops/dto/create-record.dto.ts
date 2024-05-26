import { IsNotEmpty } from 'class-validator';

export class CreateRecordDto {
  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  phase: string;

  @IsNotEmpty()
  payload: Record<string, string>;

  @IsNotEmpty()
  cropId: string;
}
