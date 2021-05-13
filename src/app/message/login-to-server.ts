/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
export class LoginToServer {
  constructor(
    private readonly user: string,
    private readonly password: string,
  ) {}

  getUser(): string {
    return this.user;
  }

  getPassword(): string {
    return this.password;
  }
}
