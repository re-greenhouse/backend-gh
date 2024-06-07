import { Crop } from './crop';

export class CropRecord {
  public author: string;
  public phase: string;
  public payload: string;
  public crop: Crop | null;
  public createdDate: string;
  public updatedDate: string;

  constructor(public id: string) {}
}
