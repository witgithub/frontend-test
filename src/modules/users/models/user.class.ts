export class User {
  constructor(
    public readonly id: string,
    public readonly avatarUrl: string,
    public readonly name: string,
    public readonly company: string,
    public readonly email: string,
    public readonly phone: string,
    public readonly address: string,
    public readonly createdAt: number,
    public readonly tags: string[]
  ) {}
}
