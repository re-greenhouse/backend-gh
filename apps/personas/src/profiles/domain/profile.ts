import { Role } from '../infrastructure/persistence/orm/enums/role.enum';
import { Company } from './company';

export class Profile {
  public firstName: string;
  public lastName: string;
  public iconUrl: string;
  public role: Role;

  constructor(
    public id: string,
    public userId: string,
    public company: Company | null,
  ) {}
}
