import { IsOptional } from 'class-validator';

export class UpdateCropDto {
  @IsOptional()
  phase: string;

  @IsOptional()
  state: boolean;
}
