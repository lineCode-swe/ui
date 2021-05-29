/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import { Component } from '@angular/core';
import { Cell } from "../cell";
import { Position } from "../position";
import { ServerService } from "../server-service";
import { Direction } from "../direction.enum";
import { Observer } from "rxjs";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  // TESTING
  private mapLengthTemp: number;
  private mapHeightTemp: number;

  private mapLength: Array<number> = [];
  private mapHeight: Array<number> = [];

  // TESTING - Dovrebbe essere Observable<Cell>
  public map: Cell[];
  // public obstacles: Position[];

  constructor(private service: ServerService) {
    this.mapLengthTemp = 4; // this.service.getMapLength();
    for (let i: number = 0; i<this.mapLengthTemp; i++) {
      this.mapLength.push(i);
    }

    this.mapHeightTemp = 3; // this.service.getMapHeight();
    for (let i: number = 0; i<this.mapHeightTemp; i++) {
      this.mapHeight.push(i);
    }

    // TESTING
    let poiCell1: Cell = new Cell(new Position(0, 0), false, true, false, Direction.ALL, false, "A");
    let poiCell2: Cell = new Cell(new Position(0, 1), false, false, false, Direction.UP, false, "B");
    let lockCell1: Cell = new Cell(new Position(0, 2), true, false, false, Direction.DOWN, false, "");
    let baseCell1: Cell = new Cell(new Position(0, 3), false, false, true, Direction.LEFT, false, "");

    let baseCell2: Cell = new Cell(new Position(1, 0), false, false, true, Direction.ALL, false, "C");
    let lockCell2: Cell = new Cell(new Position(1, 1), true, false, false, Direction.RIGHT, false, "");
    let poiCell3: Cell = new Cell(new Position(1, 2), false, false, false, Direction.RIGHT, true, "");
    let poiCell4: Cell = new Cell(new Position(1, 3), false, true, false, Direction.DOWN, false, "");

    let emptyCell1: Cell = new Cell(new Position(1, 0), false, false, false, Direction.ALL, false, "");
    let emptyCell2: Cell = new Cell(new Position(1, 1), false, false, false, Direction.ALL, false, "");
    let emptyCell3: Cell = new Cell(new Position(1, 2), false, false, false, Direction.ALL, false, "");
    let emptyCell4: Cell = new Cell(new Position(1, 3), false, false, false, Direction.ALL, false, "");

    this.map = [
      poiCell1, poiCell2, lockCell1, baseCell1,
      baseCell2, lockCell2, poiCell3, poiCell4,
      emptyCell1, emptyCell2, emptyCell3, emptyCell4
    ];
  }

  getArrayLength(): Array<number> {
    return this.mapLength;
  }

  getArrayHeight(): Array<number> {
    return this.mapHeight;
  }

  displayCell(cell: Cell, i: number, j: number): string {
    let htmlStr: string = '';
    let pos: Position= new Position(i, j);
    if (cell.getPosition().toString() == pos.toString()) {
      // OBSTACLE + UNITS
      if (cell.getObstacle() && cell.getUnit() != "") {
        htmlStr += '\xa0O<sup>U</sup>\xa0';
      }
      // OBSTACLE
      else if (cell.getObstacle()) {
        htmlStr += '\xa0O\xa0';
      }
      // UNITS
      else if (cell.getUnit() != "") {
        htmlStr += '\xa0U\xa0';
      }
    }
    return htmlStr;
  }

  directionAll(i: number, j: number): boolean {
    let pos: number = this.getArrayLength().length * i + j;
    return this.map[pos].getDirection() == Direction.ALL;
  }

  directionUp(i: number, j: number): boolean {
    let pos: number = this.getArrayLength().length * i + j;
    return this.map[pos].getDirection() == Direction.UP;
  }

  directionDown(i: number, j: number): boolean {
    let pos: number = this.getArrayLength().length * i + j;
    return this.map[pos].getDirection() == Direction.DOWN;
  }

  directionLeft(i: number, j: number): boolean {
    let pos: number = this.getArrayLength().length * i + j;
    return this.map[pos].getDirection() == Direction.LEFT;
  }

  directionRight(i: number, j: number): boolean {
    let pos: number = this.getArrayLength().length * i + j;
    return this.map[pos].getDirection() == Direction.RIGHT;
  }

  cellLocked(i: number, j: number): boolean {
    let pos: number = this.getArrayLength().length * i + j;
    return this.map[pos].isLocked();
  }

  cellBase(i: number, j: number): boolean {
    let pos: number = this.getArrayLength().length * i + j;
    return this.map[pos].isBase();
  }

  cellPoi(i: number, j: number): boolean {
    let pos: number = this.getArrayLength().length * i + j;
    return this.map[pos].isPoi();
  }
}


