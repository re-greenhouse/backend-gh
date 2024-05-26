import { Crop } from '../../domain/crop';

export class CreateRecordCommand {
  constructor(
    public author: string,
    public phase: string,
    public payload: object,
    public crop: Crop,
  ) {}
}
