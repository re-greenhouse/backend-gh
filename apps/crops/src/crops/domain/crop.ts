export class Crop {
  public name: string;
  public author: string;

  constructor(
    public id: string,
    public createdDate: string,
    public active: boolean,
  ) {}
}
