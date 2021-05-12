export class User {
  constructor(
    private readonly username: string,
    private readonly admin: boolean,
  ) {}

  getUsername(): string {
    return this.username;
  }

  getAdmin(): boolean {
    return this.admin;
  }
}
