import { CropPhase } from '../infrastructure/persistence/orm/enums/phase.enum';
import { CropQuality } from '../infrastructure/persistence/orm/enums/quality.enum';

export class Crop {
  public name: string;
  public author: string;
  public phase: CropPhase;
  public startDate: string;
  public imageUrl: string;
  public quality: CropQuality;
  public companyId: string;

  constructor(
    public id: string,
    public state: boolean,
  ) {}
}
