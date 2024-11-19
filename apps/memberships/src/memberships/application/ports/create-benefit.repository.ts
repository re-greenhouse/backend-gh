import { Benefit } from '../../domain/value_objects/benefit';

export abstract class CreateBenefitRepository {
  abstract save(benefit: Benefit): Promise<Benefit>;
}
