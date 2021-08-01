/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */
export class Position {

  constructor(
    private readonly x: number,
    private readonly y: number,
  ) {}

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }
}
