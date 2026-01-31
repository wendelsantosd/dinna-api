export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly id?: string,
    public readonly created_at?: Date | string,
    public readonly updated_at?: Date | string,
  ) {}
}
