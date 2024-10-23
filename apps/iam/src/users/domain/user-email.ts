import { GrpcInvalidArgumentException } from 'nestjs-grpc-exceptions';

export class UserEmail {
  private static readonly validEmailRegExp =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|proton\.me|yahoo\.com|apple\.com)$/;

  constructor(public readonly email: string) {
    this.ensureMailIsDefined(email);
    this.ensureIsValidEmail(email);
  }

  private ensureMailIsDefined(email: string) {
    if (email.length < 5) {
      throw new GrpcInvalidArgumentException('Invalid is not defined');
    }
  }

  private ensureIsValidEmail(email: string) {
    if (!UserEmail.validEmailRegExp.test(email)) {
      throw new GrpcInvalidArgumentException(
        `"${email}" is not a valid email.`,
      );
    }
  }

  equals(other: UserEmail): boolean {
    return (
      other.constructor.name === this.constructor.name &&
      other.email === this.email
    );
  }

  toString(): string {
    return this.email;
  }
}
