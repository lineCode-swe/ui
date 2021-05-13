/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
export class MapToServer {
  constructor(
    private readonly mapConfig: string,
  ) {}

  getMapConfig(): string {
    return this.mapConfig;
  }
}
