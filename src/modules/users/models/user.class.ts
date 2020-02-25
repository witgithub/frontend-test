import { createUUID } from '../../shared/helpers/create-uuid.function';
export class User {
  constructor(
    public avatarUrl: string,
    public name: string,
    public company: string,
    public email: string,
    public phone: string,
    public address: string,
    public about: string,
    public tags: string[],
    public readonly createdAt?: number,
    public readonly id?: string,
  ) {
    if (!this.createdAt) {
      this.createdAt = Date.now();
    }
    if (!this.id) {
      this.id = createUUID();
    }
  }
}
