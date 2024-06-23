export class UpdateCompanyCommand {
  constructor(
    public id: string,
    public name?: string,
    public tin?: string,
    public logoUrl?: string,
  ) {}
}
