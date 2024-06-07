import { Crop } from './crop';
import { CropPhase } from '../infrastructure/persistence/orm/enums/phase.enum';

export class CropRecord {
  public author: string;
  public phase: CropPhase;
  public payload: string;
  public crop: Crop | null;
  public createdDate: string;
  public updatedDate: string;

  constructor(public id: string) {}
}
