import { MembershipLevel } from '../membershipLevel';

export class Benefit {
  public name: string;
  public value: number;
  public membershipLevel?: MembershipLevel;

  constructor(id: string) {}
}
