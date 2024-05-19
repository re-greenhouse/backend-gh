import { IsNotEmpty } from 'class-validator';

export class CreateCropDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  author: string;
}
