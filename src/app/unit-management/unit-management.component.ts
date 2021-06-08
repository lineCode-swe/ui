/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import {Component, OnInit} from '@angular/core';
import {ServerService} from "../server-service";
import {Unit} from "../unit";

@Component({
  selector: 'app-unit-management',
  templateUrl: './unit-management.component.html',
  styleUrls: ['./unit-management.component.css']
})
export class UnitManagementComponent implements OnInit {

  private units: Unit[] = [];
  private unitId: string = '';

  constructor(private service: ServerService) { }

  ngOnInit() {
    this.units = this.service.getUnits();

    this.service.subscribeUnits({
      next: units => { this.units = units; }
    })
  }

  getUnits(): Unit[] {
    return this.units;
  }

  getUnitId(): string {
    return this.unitId;
  }

  selectUnit(unitId: string): void {
    this.unitId = unitId;
  }

}
