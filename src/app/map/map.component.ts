/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import { Component, OnInit } from '@angular/core';
import { Cell } from "../cell";
import { Position } from "../position";
import { ServerService } from "../server-service";
import { Direction } from "../direction.enum";
import { Observable } from "rxjs";
import {Unit} from "../unit";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private mapLength: Array<number> = [];
  private mapHeight: Array<number> = [];

  private map: Cell[] = [];

  constructor(private service: ServerService) {

    for (let i: number = 0; i<this.service.getMapLength(); i++) {
      this.mapLength.push(i);
    }

    for (let i: number = 0; i<this.service.getMapHeight(); i++) {
      this.mapHeight.push(i);
    }

  }

  ngOnInit() {
    this.map = this.service.getCells();

    this.service.subscribeCells({
      next: cells => { this.map = cells; }
    })
  }

  getMap(): Cell[] {
    return this.map;
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
      // OBSTACLE + UNITS (WOULD BE AN ERROR)
      if (cell.getObstacle() && cell.getUnit() != "") {
        htmlStr += '\xa0O<sup>U</sup>\xa0';
      }
      // OBSTACLE
      else if (cell.getObstacle()) {
        htmlStr += '\xa0O\xa0';
      }
      // UNITS
      else if (cell.getUnit() != "") {
        htmlStr += '\xa0U<sup>' + cell.getUnit() + '</sup>\xa0';
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


