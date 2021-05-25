/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
export class Position {

  constructor(
    private readonly x: number,
    private readonly y: number,
  ) {}

  toString(): string {
    return '(' + this.x + ';' + this.y + ')';
  }

  getX(): number {
    return this.x;
  }

  getY(): number {
    return this.y;
  }
}
