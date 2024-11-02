import { CropPhase } from '../infrastructure/persistence/orm/enums/phase.enum';

export class Crop {
  public name: string;
  public author: string;
  public phase: CropPhase;
  public startDate: string;
  public companyId: string;

  constructor(
    public id: string,
    public state: boolean,
  ) {}
}
