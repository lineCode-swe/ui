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

@Component({
  selector: 'app-unit-management',
  templateUrl: './unit-management.component.html',
  styleUrls: ['./unit-management.component.css']
})
export class UnitManagementComponent {

  // Observable<Unit[]>
  public obs: Unit[];

  constructor(private service: ServerService) {

    // TESTING
    let base1: Position = new Position(0, 0);
    let base2: Position = new Position(1, 0);
    let base3: Position = new Position(1, 3);
    let pos1: Position = new Position(0, 2);
    let pos2: Position = new Position(0, 3);
    let pos3: Position = new Position(1, 0);
    let pos4: Position = new Position(1, 2);

    let unit1: Unit = new Unit("1", "A", base1, base1, [], UnitStatus.BASE, 0, 0);
    let unit2: Unit = new Unit("2", "B", base2, pos1, [pos1, pos2], UnitStatus.GOINGTO, 0, 50);
    let unit3: Unit = new Unit("3", "C", base3, pos2, [pos3], UnitStatus.STOP, 1, 0);
    let unit4: Unit = new Unit("4", "D", base1, pos3, [pos4], UnitStatus.GOINGTO, 0, 50);

    this.obs = [unit1, unit2, unit3, unit4];
  }

  getUnitDetails(unitID: string): void {
    // this.service.FUNZIONE-DA-SERVICE-VERSO-DETAILS
  }

}
