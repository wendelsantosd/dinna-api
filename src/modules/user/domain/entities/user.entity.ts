enum Role {
  ADMIN,
  USER,
}

export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
    public readonly id?: string,
    public readonly role?: Role,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
