import { Crop } from './crop';

export class CropRecord {
  public author: string;
  public phase: string;
  public payload: Record<string, any>;
  public crop: Crop;

  constructor(
    public id: string,
    public createdDate: Date,
    public updatedDate: Date,
  ) {}
}
