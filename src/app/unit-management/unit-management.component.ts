/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import {Component} from '@angular/core';
import {ServerService} from "../server-service";
import {Unit} from "../unit";
import {Position} from "../position";
import {UnitStatus} from "../unit-status.enum";

@Component({
  selector: 'app-unit-management',
  templateUrl: './unit-management.component.html',
  styleUrls: ['./unit-management.component.css']
})
export class UnitManagementComponent {

  private units: Unit[] = [];
  private unitIndex: number = 0;

  constructor(private service: ServerService) {

    // this.units = this.service.getUnitObservable();

    let pos1: Position = new Position(0, 0);
    let pos2: Position = new Position(1, 0);
    let pos3: Position = new Position(0, 2);
    let pos4: Position = new Position(1, 3);
    let pos5: Position = new Position(0, 3);
    let pos6: Position = new Position(2, 1);

    let unit1: Unit = new Unit('0', 'A', pos1, pos5, [pos1, pos4], UnitStatus.GOINGTO, 0, 50);
    let unit2: Unit = new Unit('1', 'B', pos3, pos2, [pos4], UnitStatus.STOP, 0, 50);
    let unit3: Unit = new Unit('2', 'C', pos1, pos1, [pos3, pos2], UnitStatus.BASE, 0, 50);
    let unit4: Unit = new Unit('3', 'D', pos4, pos3, [pos1], UnitStatus.STOP, 0, 50);
    let unit5: Unit = new Unit('4', 'E', pos1, pos4, [pos5, pos4], UnitStatus.GOINGTO, 0, 50);
    let unit6: Unit = new Unit('5', 'F', pos3, pos6, [pos6, pos3], UnitStatus.GOINGTO, 0, 50);

    this.units = [unit1, unit2, unit3, unit4, unit5, unit6];

  }

  getUnits(): Unit[] {
    return this.units;
  }

  getUnitIndex(): number {
    return this.unitIndex;
  }

  selectUnit(unitIndex: number): void {
    this.unitIndex = unitIndex;
  }

}
