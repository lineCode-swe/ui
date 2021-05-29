/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import { Component } from '@angular/core';
import { ServerService } from "../server-service";
import { Unit } from "../unit";
import { Position } from "../position";
import { UnitStatus } from "../unit-status.enum";
import { Observable } from "rxjs";

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css']
})
export class UnitDetailsComponent {

  // Observable<Unit[]>
  public obs: Unit[];

  constructor(private service: ServerService) {

    // TESTING
    let base1: Position = new Position(1, 0);
    let pos1: Position = new Position(0, 2);
    let pos2: Position = new Position(0, 3);
    let unit: Unit = new Unit("2", "B", base1, pos1, [pos1, pos2], UnitStatus.GOINGTO, 0, 50);
    this.obs = [unit];
  }

}
