/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import { Component, OnInit } from '@angular/core';
import { Cell } from "../cell";
import { ServerService } from "../server-service";
import { Direction } from "../direction.enum";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public countFunction: number = 0;
  private mapLength: Array<number> = [];
  private mapHeight: Array<number> = [];

  private map: Cell[];

  constructor(private service: ServerService) {

    for (let i: number = 0; i<this.service.getMapLength(); i++) {
      this.mapLength.push(1);
    }

    for (let i: number = 0; i<this.service.getMapHeight(); i++) {
      this.mapHeight.push(1);
    }

    console.log(this.mapLength);
    console.log(this.mapHeight);

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

  getMapLength(): Array<number> {
    return this.mapLength;
  }

  getMapHeight(): Array<number> {
    return this.mapHeight;
  }

  displayCell(cell: Cell): string {
    console.log(cell);
    let htmlStr: string = '';
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
      htmlStr += '\xa0U<sup>' + this.service.getUnit(cell.getUnit()).getName() + '</sup>\xa0';
    }
    return htmlStr;
  }

  directionAll(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.map[pos].getDirection() == Direction.ALL;
  }

  directionUp(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.map[pos].getDirection() == Direction.UP;
  }

  directionDown(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.map[pos].getDirection() == Direction.DOWN;
  }

  directionLeft(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.map[pos].getDirection() == Direction.LEFT;
  }

  directionRight(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.map[pos].getDirection() == Direction.RIGHT;
  }

  cellLocked(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.map[pos].isLocked();
  }

  cellBase(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.map[pos].isBase();
  }

  cellPoi(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.map[pos].isPoi();
  }
}


