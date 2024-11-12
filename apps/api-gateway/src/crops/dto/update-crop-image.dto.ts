import { IsOptional } from 'class-validator';

export class UpdateCropImageDto {
  @IsOptional()
  imageUrl: string;

  @IsOptional()
  quality: string;
}
