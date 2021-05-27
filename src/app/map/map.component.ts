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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // public mapLength: number = 0;
  // public mapHeight: number = 0;
  // public grid: Cell[];

  constructor(private service: ServerService) {
    // this.mapLength = 10; // this.ws.getMapLength();
    // this.mapHeight = 5; // this.ws.getMapHeight();
    //
    // let poiCell1: Cell = new Cell(new Position(0, 0), false, true, false);
    // let posCell2: Cell = new Cell(new Position(0, 1), false, true, false);
    // let lockCell: Cell = new Cell(new Position(1, 0), true, false, false);
    // let baseCell: Cell = new Cell(new Position(1, 1), false, false, true);
    // this.grid = [
    //   poiCell1, posCell2, lockCell, baseCell
    // ];
  }

  ngOnInit(): void {
    console.log("ciao");
  }

  // getMapLength(): number {
  //   return this.mapLength;
  // }
  //
  // getMapHeight(): number {
  //   return this.mapHeight;
  // }
  //
  // displayRows(): string {
  //   let htmlStr: string = '<h1>hi</h1>';
  //
  //   let singleCell: string = `<td></td>`;
  //
  //   let poiCell1: Cell = new Cell(new Position(0, 0), false, true, false);
  //   let posCell2: Cell = new Cell(new Position(0, 1), false, true, false);
  //   let lockCell: Cell = new Cell(new Position(1, 0), true, false, false);
  //   let baseCell: Cell = new Cell(new Position(1, 1), false, false, true);
  //   let grid: Cell[] = [
  //     poiCell1, posCell2, lockCell, baseCell,
  //     poiCell1, posCell2, lockCell, baseCell,
  //     poiCell1, posCell2, lockCell, baseCell,
  //     poiCell1, posCell2, lockCell, baseCell,
  //     poiCell1, posCell2, lockCell, baseCell,
  //   ];
  //
  //
  //
  //
  //   // for (let i=0; i < this.height; i++) {
  //   //   for ( let j=0; j < this.length; j++) {
  //   //     htmlStr.concat(('<td>basasuabuysad</td>').toString());
  //   //   }
  //   // }
  //   // return `
  //   //   <td>basasuabuysad</td>
  //   // `;
  //
  //   return htmlStr;
  // }
}
