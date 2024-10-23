export class UpdateTemplateCommand {
  constructor(
    public readonly id: string,
    public readonly subject?: string,
    public readonly body?: string,
  ) {}
}
