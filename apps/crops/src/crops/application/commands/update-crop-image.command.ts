export class UpdateCropImageCommand {
  constructor(
    public readonly id: string,
    public readonly imageUrl: string,
    public readonly quality: string,
  ) {}
}
