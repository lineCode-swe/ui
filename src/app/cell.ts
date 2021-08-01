/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */
import {Position} from "./position";
import {Direction} from "./direction.enum";

export class Cell {
  constructor(
    private readonly position: Position,
    private readonly locked: boolean,
    private readonly poi: boolean,
    private readonly base: boolean,
    private readonly direction: Direction = Direction.ALL,
    private obstacle: boolean = false,
    private unit: string = '',
  ) {}

  getPosition(): Position {
    return this.position;
  }

  isLocked(): boolean {
    return this.locked;
  }

  isPoi(): boolean {
    return this.poi;
  }

  isBase(): boolean {
    return this.base;
  }

  getDirection(): Direction {
    return this.direction;
  }

  getObstacle(): boolean {
    return this.obstacle;
  }

  setObstacle(obstacle: boolean) {
    this.obstacle = obstacle;
  }

  getUnit(): string {
    return this.unit;
  }

  setUnit(unit: string) {
    this.unit = unit;
  }
}
