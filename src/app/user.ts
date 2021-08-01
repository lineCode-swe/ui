/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */
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
