export class ComparePasswordForUsernameQuery {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
}
