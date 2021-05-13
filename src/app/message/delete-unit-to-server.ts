/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
export class DeleteUnitToServer {
  constructor(
    private readonly unitId: string,
  ) {}

  getUnitId(): string {
    return this.unitId;
  }
}
