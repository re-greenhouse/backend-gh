export class CreateMembershipCommand {
  constructor(
    public membershipLevelName: string,
    public companyId: string,
    public startDate: string,
    public endDate: string,
  ) {}
}
