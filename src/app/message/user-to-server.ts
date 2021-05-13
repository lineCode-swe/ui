/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
export class UserToServer {
  constructor(
    private readonly user: string,
    private readonly password: string,
    private readonly admin: boolean,
  ) {}

  getUser(): string {
    return this.user;
  }

  getPassword(): string {
    return this.password;
  }

  isAdmin(): boolean {
    return this.admin;
  }
}
