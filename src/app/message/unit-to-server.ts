/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import {Position} from "../position";

export class UnitToServer {
  constructor(
    private readonly unitId: string,
    private readonly unitName: string,
    private readonly unitBase: Position,
  ) {}

  getUnitId(): string {
    return this.unitId;
  }

  getUnitName(): string {
    return this.unitName;
  }

  getUnitBase(): Position {
    return this.unitBase;
  }
}
