import { Benefit } from './value_objects/benefit';

export class MembershipLevel {
  public name: string;
  public benefits: Benefit[];
  constructor(public id: string) {}
}
