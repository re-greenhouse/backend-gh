export class UpdateCropCommand {
  constructor(
    public readonly id: string,
    public readonly phase?: string,
    public readonly state?: boolean,
  ) {}
}
