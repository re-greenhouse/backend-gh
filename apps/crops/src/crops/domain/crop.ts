import { CropPhase } from '../infrastructure/persistence/orm/enums/phase.enum';

export class Crop {
  public name: string;
  public author: string;
  public phase: CropPhase;

  constructor(
    public id: string,
    public createdAt: string,
    public state: boolean,
  ) {}
}
