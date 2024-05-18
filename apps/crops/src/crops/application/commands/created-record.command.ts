import { Crop } from '../../domain/crop';

export class CreatedRecordCommand {
  constructor(
    public createdDate: Date,
    public updatedDate: Date,
    public author: string,
    public phase: string,
    public payload: object,
    public crop: Crop,
  ) {}
}
