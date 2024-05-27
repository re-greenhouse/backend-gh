export class Crop {
  public name: string;
  public author: string;

  constructor(
    public id: string,
    public createdAt: string,
    public state: boolean,
  ) {}
}
