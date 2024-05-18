export class Record {
  public createdDate: Date;
  public updatedDate: Date;
  public author: string;
  public phase: string;
  public payload: Map<string, string>;

  constructor(
    public id: string,
    public cropId: string,
  ) {}
}
