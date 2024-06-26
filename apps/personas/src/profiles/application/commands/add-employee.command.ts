export class AddEmployeeCommand {
  constructor(
    public companyId: string,
    public employeeId: string,
  ) {}
}
