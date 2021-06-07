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
import {Observable} from "rxjs";

@Component({
  selector: 'app-unit-management',
  templateUrl: './unit-management.component.html',
  styleUrls: ['./unit-management.component.css']
})
export class UnitManagementComponent {

  private units: Observable<Unit[]>;
  private unitId: string = '';

  constructor(private service: ServerService) {
    this.units = this.service.getUnitObservable();

  }

  getUnits(): Observable<Unit[]> {
    return this.units;
  }

  getUnitId(): string {
    return this.unitId;
  }

  selectUnit(unitId: string): void {
    this.unitId = unitId;
  }

}
