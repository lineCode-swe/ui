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
import {Position} from "../position";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private mapLength: Array<number> = [];
  private mapHeight: Array<number> = [];

  public gridMap: Cell[];

  constructor(private service: ServerService) {}

  ngOnInit() {
    this.gridMap = this.service.getCells();

    this.service.subscribeCells({
      next: map => {
        this.gridMap = map;
      }
    });

    for (let i: number = 0; i<this.service.getMapLength(); i++) {
      this.mapLength.push(1);
    }

    for (let i: number = 0; i<this.service.getMapHeight(); i++) {
      this.mapHeight.push(1);
    }
  }

  getMap(): Cell[] {
    return this.gridMap;
  }

  getMapLength(): Array<number> {
    return this.mapLength;
  }

  getMapHeight(): Array<number> {
    return this.mapHeight;
  }

  displayCell(cell: Cell, i: number, j: number): string {
    let htmlStr: string = '';

    let cellPos: number = this.getMapLength().length * cell.getPosition().getY() + cell.getPosition().getX();
    let indexPos: number = this.getMapLength().length * i + j;

    if (cellPos == indexPos) {
      // OBSTACLE + UNITS (WOULD BE AN ERROR)
      if (cell.getObstacle() && cell.getUnit() != "") {
        htmlStr += '\xa0O<sup>U</sup>\xa0';
      }
      // OBSTACLE
      else if (cell.getObstacle()) {
        htmlStr += '\xa0O\xa0';
      }
      // UNIT
      else if (cell.getUnit()) {
        htmlStr += '\xa0U<sup>' + this.service.getUnit(cell.getUnit()).getName() + '</sup>\xa0';
      }
    }

    return htmlStr;
  }

  directionAll(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.gridMap[pos].getDirection() == Direction.ALL;
  }

  directionUp(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.gridMap[pos].getDirection() == Direction.UP;
  }

  directionDown(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.gridMap[pos].getDirection() == Direction.DOWN;
  }

  directionLeft(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.gridMap[pos].getDirection() == Direction.LEFT;
  }

  directionRight(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.gridMap[pos].getDirection() == Direction.RIGHT;
  }

  cellLocked(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.gridMap[pos].isLocked();
  }

  cellBase(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.gridMap[pos].isBase();
  }

  cellPoi(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.gridMap[pos].isPoi();
  }

  cellUnit(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.gridMap[pos].getUnit() != "";
  }

  cellObstacle(i: number, j: number): boolean {
    let pos: number = this.getMapLength().length * i + j;
    return this.gridMap[pos].getObstacle();
  }

}


