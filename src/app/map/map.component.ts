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
import {ServerService } from "../server-service";
import { Direction } from "../direction.enum";
import {Observable, Observer} from "rxjs";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  private arrayLength: Array<number> = [];
  private arrayHeight: Array<number> = [];

  public obs: Observable<Cell[]>;

  constructor(private service: ServerService) {

    this.obs

    for (let i: number = 0; i < this.service.getMapLength(); i++) {
      this.arrayLength.push(i);
    }

    for (let i: number = 0; i < this.service.getMapHeight(); i++) {
      this.arrayHeight.push(i);
    }

  }

  getArrayLength(): Array<number> {
    return this.arrayLength;
  }

  getArrayHeight(): Array<number> {
    return this.arrayHeight;
  }

  displayCell(cell: Cell, i: number, j: number): string {
    let htmlStr: string = '';
    let pos: Position= new Position(i, j);
    if (cell.getPosition().toString() == pos.toString()) {
      // POI + UNITS
      if (cell.isPoi() && cell.getUnit() != "") {
        htmlStr += '\xa0P<sup>U</sup>\xa0';
      }
      // POI
      else if (cell.isPoi()) {
        htmlStr += '\xa0P\xa0';
      }
      // BASE + UNITS
      else if (cell.isBase() && cell.getUnit() != "") {
        htmlStr += '\xa0B<sup>U</sup>\xa0';
      }
      // BASE
      else if (cell.isBase()) {
        htmlStr += '\xa0B\xa0';
      }
      // OBSTACLE + UNITS
      else if (cell.getObstacle() && cell.getUnit() != "") {
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
    let pos: number = this.service.getMapLength() * i + j;
    return this.obs[pos].getDirection() == Direction.ALL;
  }

  directionUp(i: number, j: number): boolean {
    let pos: number = this.service.getMapLength() * i + j;
    return this.obs[pos].getDirection() == Direction.UP;
  }

  directionDown(i: number, j: number): boolean {
    let pos: number = this.service.getMapLength() * i + j;
    return this.obs[pos].getDirection() == Direction.DOWN;
  }

  directionLeft(i: number, j: number): boolean {
    let pos: number = this.service.getMapLength() * i + j;
    return this.obs[pos].getDirection() == Direction.LEFT;
  }

  directionRight(i: number, j: number): boolean {
    let pos: number = this.service.getMapLength() * i + j;
    return this.obs[pos].getDirection() == Direction.RIGHT;
  }

  cellLocked(i: number, j: number): boolean {
    let pos: number = this.service.getMapLength() * i + j;
    return this.obs[pos].isLocked();
  }

}


