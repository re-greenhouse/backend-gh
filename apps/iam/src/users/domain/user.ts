import { Role } from '../infrastructure/persistence/orm/enums/role.enum';

export class User {
  public username: string;
  public password: string;
  public role: Role;

  constructor(public id: string) {}
}
