import { Crop } from '../../domain/crop';

export class GetRecordsByCropAndPhaseQuery {
  constructor(
    public crop: Crop,
    public phase: string,
  ) {}
}
