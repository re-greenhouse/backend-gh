export class CreateProfileCommand {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly iconUrl: string,
    public readonly userId: string,
  ) {}
}
