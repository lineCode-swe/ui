/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import {Position} from "./position";
import {UnitStatus} from "./unit-status.enum";

export class Unit {
  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly base: Position,
    private position: Position = base,
    private poiList: Position[] = [],
    private status: UnitStatus = UnitStatus.BASE,
    private error: number = 0,
    private speed: number = 0,
  ) {}

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getBase(): Position {
    return this.base;
  }

  getPosition(): Position {
    return this.position;
  }

  setPosition(position: Position): void {
    this.position = position;
  }

  getPoiList(): Position[] {
    return this.poiList;
  }

  setPoiList(poiList: Position[]): void {
    this.poiList = poiList;
  }

  getStatus(): UnitStatus {
    return this.status;
  }

  setStatus(status: UnitStatus): void {
    this.status = status;
  }

  getError(): number {
    return this.error;
  }

  setError(error: number): void {
    this.error = error;
  }

  getSpeed(): number {
    return this.speed;
  }

  setSpeed(speed: number): void {
    this.speed = speed;
  }
}
