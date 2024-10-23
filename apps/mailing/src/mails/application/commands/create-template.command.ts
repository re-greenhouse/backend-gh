export class CreateTemplateCommand {
  constructor(
    public readonly eventName: string,
    public readonly subject: string,
    public readonly body: string,
  ) {}
}
