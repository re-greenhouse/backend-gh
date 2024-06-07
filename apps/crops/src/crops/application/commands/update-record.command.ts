export class UpdateRecordCommand {
  constructor(
    public readonly id: string,
    public readonly payload: string,
  ) {}
}
