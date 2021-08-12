/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import { Component, OnInit } from '@angular/core';
import { ServerService } from "../server-service";
import { Position } from "../position";
import { Unit } from "../unit";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-unit-table',
  templateUrl: './unit-table.component.html',
  styleUrls: ['./unit-table.component.css']
})
export class UnitTableComponent implements OnInit {

  private alert_unit_created = false;
  private alert_unit_deleted = false;
  private alert_input_fields = false;

  private alert_p_id = false;
  private alert_p_name = false;
  private alert_p_x = false;
  private alert_p_y = false;
  private alert_p_position = false;

  private units: Unit[];
  unitForm: FormGroup = this.formBuilder.group({
    unitID: null,
    unitName: null,
    baseX: null,
    baseY: null
  });

  constructor(private service: ServerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.units = this.service.getUnits();

    this.service.subscribeUnits({
      next: units => { this.units = units; }
    })
  }

  getUnits(): Unit[] {
    return this.units;
  }

  resetAlerts(): void {
    this.alert_unit_created = false;
    this.alert_unit_deleted = false;
    this.alert_input_fields = false;

    this.alert_p_id = false;
    this.alert_p_name = false;
    this.alert_p_x = false;
    this.alert_p_y = false;
    this.alert_p_position = false;
  }

  getAlertUnitCreated(): boolean {
    return this.alert_unit_created;
  }

  getAlertUnitDeleted(): boolean {
    return this.alert_unit_deleted;
  }

  getAlertPId(): boolean {
    return this.alert_p_id;
  }

  getAlertPName(): boolean {
    return this.alert_p_name;
  }

  getAlertPX(): boolean {
    return this.alert_p_x;
  }

  getAlertPY(): boolean {
    return this.alert_p_y;
  }

  getAlertPPosition(): boolean {
    return this.alert_p_position;
  }

  getAlertInputFields(): boolean {
    return this.alert_input_fields;
  }

  setAlertUnitCreated(view: boolean): void {
    this.alert_unit_created = view;
  }

  setAlertUnitDeleted(view: boolean): void {
    this.alert_unit_deleted = view;
  }

  setAlertInputFields(view: boolean): void {
    this.alert_input_fields = view;
  }

  getMapLength(): number {
    return this.service.getMapLength();
  }

  getMapHeight(): number {
    return this.service.getMapHeight();
  }

  onSubmit() {
    this.resetAlerts();
    let alertPId = false;
    let alertPName = false;
    let alertPX = false;
    let alertPY = false;
    let alertPPosition = false;

    if (
      this.unitForm.controls['unitID'].value == null ||
      !this.unitForm.controls['unitID'].value.match(/^[a-zA-Z0-9-_]+$/)
    ) {
      alertPId = true;
    }

    if (
      this.unitForm.controls['unitName'].value == null ||
      !this.unitForm.controls['unitName'].value.match(/^[a-zA-Z0-9]+$/)
    ) {
      alertPName = true;
    }

    if (
      -1 >= this.unitForm.controls['baseX'].value ||
      this.unitForm.controls['baseX'].value > (this.service.getMapLength()-1) ||
      this.unitForm.controls['baseX'].value == null
    ) {
      alertPX = true;
    }

    if (-1 >= this.unitForm.controls['baseY'].value ||
      this.unitForm.controls['baseY'].value > (this.service.getMapHeight()-1) ||
      this.unitForm.controls['baseY'].value == null
    ) {
      alertPY = true;
    }

    if (!alertPX && !alertPY) {
      let pos: Position = new Position(this.unitForm.controls['baseX'].value, this.unitForm.controls['baseY'].value);
      if (!this.service.getCell(pos).isBase()) {
        alertPPosition = true;
      }
    }

    if (!alertPId && !alertPName && !alertPX && !alertPY && !alertPPosition) {
      this.service.addUnit(
        this.unitForm.controls['unitID'].value,
        this.unitForm.controls['unitName'].value,
        new Position(this.unitForm.controls['baseX'].value, this.unitForm.controls['baseY'].value
        )
      );
      this.unitForm.reset();
      this.alert_unit_created = true;
    }
    else {
      this.alert_input_fields = true;
      if (alertPId) this.alert_p_id = true;
      if (alertPName) this.alert_p_name = true;
      if (alertPX) this.alert_p_x = true;
      if (alertPY) this.alert_p_y = true;
      if (alertPPosition) this.alert_p_position = true;
    }
  }

  deleteUnit(id: string) {
    this.resetAlerts();
    this.alert_unit_deleted = true;
    this.service.deleteUnit(id);
  }

}
