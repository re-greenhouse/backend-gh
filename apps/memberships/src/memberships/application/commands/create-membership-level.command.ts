import { Benefit } from '../../domain/value_objects/benefit';

export class CreateMembershipLevelCommand {
  constructor(
    public name: string,
    public benefits: Benefit[],
  ) {}
}
