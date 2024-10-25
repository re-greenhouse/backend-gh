import { Role } from '../infrastructure/persistence/orm/enums/role.enum';
import { UserEmail } from './user-email';
import { Transform } from 'class-transformer';

export class User {
  public username: string;
  public password: string;
  public role: Role;

  @Transform((value) => value.toString())
  public email: UserEmail;

  constructor(
    public id: string,
    email: string,
  ) {
    this.email = new UserEmail(email);
  }

  updateEmail(email: string) {
    this.email = new UserEmail(email);
  }
}
