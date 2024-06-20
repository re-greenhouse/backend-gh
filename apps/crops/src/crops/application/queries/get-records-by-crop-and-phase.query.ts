import { Crop } from '../../domain/crop';

export class GetRecordsByCropAndPhaseQuery {
  constructor(
    public cropId: string,
    public phase: string,
  ) {}
}
