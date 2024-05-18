import { Crop } from './crop';

export class CropRecord {
  public author: string;
  public phase: string;
  public payload: Record<string, any>;

  constructor(
    public id: string,
    public createdDate: string,
    public updatedDate: string,
    public crop: Crop,
  ) {}
}
