/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
export class LogoutToServer {
  constructor(
    private readonly user: string,
  ) {}

  getUser(): string {
    return this.user;
  }
}
