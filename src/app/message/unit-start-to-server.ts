/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import {Position} from "../position";

export class UnitStartToServer {
  constructor(
    private readonly unitId: string,
    private readonly poiList: Position[],
  ) {}

  getUnitId(): string {
    return this.unitId;
  }

  getPoiList(): Position[] {
    return this.poiList;
  }
}
