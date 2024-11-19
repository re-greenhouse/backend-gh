export class UpdateMembershipCommand {
  constructor(
    public readonly id: string,
    public readonly membershipLevelName: string,
  ) {}
}
