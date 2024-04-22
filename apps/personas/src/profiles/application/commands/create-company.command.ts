import { Profile } from '../../domain/profile';

export class CreateCompanyCommand {
  constructor(
    public name: string,
    public tin: string,
    public logoUrl: string,
    public owner: Profile,
  ) {}
}
