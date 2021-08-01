/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */
import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ServerService} from "../../server-service";
import {Unit} from "../../unit";

@Component({
  selector: 'app-unit-management',
  templateUrl: './unit-management.component.html',
  styleUrls: ['./unit-management.component.css']
})
export class UnitManagementComponent implements OnInit {

  private units: Unit[] = [];

  @Output() unitSelected = new EventEmitter<string>();
  private unitId: string = '';

  selectUnit(id: string) {
    this.unitSelected.emit(id);
    this.unitId = id;
  }

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

}
