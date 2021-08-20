/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */
import {Component, Input, OnChanges, SimpleChange, SimpleChanges} from '@angular/core';
import {ServerService} from "../../server-service";
import {Unit} from "../../unit";
import {Position} from "../../position";
import {UnitStatus} from "../../unit-status.enum";
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css']
})
export class UnitDetailsComponent implements OnChanges {

  @Input() public unitId: string = "";

  private alert_input_fields = false;
  private alert_position_existent = false;
  private alert_position_invalid = false;
  private alert_empty_list = false;

  public localUnit: Unit;
  poiForm = this.formBuilder.group({
    poiX: null,
    poiY: null
  });

  constructor(private service: ServerService, private formBuilder: FormBuilder) {}

  ngOnChanges(changes: SimpleChanges) {
    let change: SimpleChange = changes['unitId'];
    if (change) {
      this.resetAlerts();
      this.unitId = change.currentValue;
      this.localUnit = this.service.getUnit(this.unitId);
    }
  }

  onSubmit(): void {
    if (
      -1 < this.poiForm.controls['poiX'].value &&
      this.poiForm.controls['poiX'].value <= this.service.getMapLength()-1 &&

      -1 < this.poiForm.controls['poiY'].value &&
      this.poiForm.controls['poiY'].value <= this.service.getMapHeight()-1 &&

      this.poiForm.controls['poiX'].value != null &&
      this.poiForm.controls['poiY'].value != null
    )
    {
      let pos: Position = new Position(this.poiForm.controls['poiX'].value, this.poiForm.controls['poiY'].value);
      if (this.service.getCell(pos).isPoi()) {
        let present: boolean = false;
        for (let poi of this.localUnit.getPoiList()) {
          if (pos.getX() == poi.getX() && pos.getY() == poi.getY()) {
            present = true;
            this.resetAlerts();
            this.setAlertPositionExistent(true);
          }
        }
        if (!present) {
          let list = this.localUnit.getPoiList();
          list.push(pos);
          this.localUnit.setPoiList(list);
          this.resetAlerts();
        }
      }
      else {
        this.resetAlerts();
        this.setAlertPositionInvalid(true);
      }
    }
    else {
      this.resetAlerts();
      this.setAlertInputFields(true);
    }
    this.poiForm.reset();
  }

  resetAlerts(): void {
    this.alert_input_fields = false;
    this.alert_position_existent = false;
    this.alert_position_invalid = false;
    this.alert_empty_list = false;
  }

  getAlertInputFields(): boolean {
    return this.alert_input_fields;
  }

  getAlertPositionExistent(): boolean {
    return this.alert_position_existent;
  }

  getAlertPositionInvalid(): boolean {
    return this.alert_position_invalid;
  }

  getAlertEmptyList(): boolean {
    return this.alert_empty_list;
  }

  setAlertInputFields(view: boolean): void {
    this.alert_input_fields = view;
  }

  setAlertPositionExistent(view: boolean): void {
    this.alert_position_existent = view;
  }

  setAlertPositionInvalid(view: boolean): void {
    this.alert_position_invalid = view;
  }

  setAlertEmptyList(view: boolean): void {
    this.alert_empty_list = view;
  }

  setUnitIndex(i: string): void {
    this.unitId = i;
  }

  unitStart(id: string, list: Position[]): void {
    this.resetAlerts();
    if (list.length > 0) {
      this.service.start(id, list);
    }
    else {
      this.alert_empty_list = true;
    }
  }

  unitGoBack(id: string): void {
    this.resetAlerts();
    this.service.goBack(id);
  }

  unitStop(id: string): void {
    this.resetAlerts();
    this.service.stop(id);
  }

  unitShutdown(id: string): void {
    this.resetAlerts();
    this.service.shutdown(id);
  }

  removePoi(i: number): void {
    let list = this.localUnit.getPoiList();
    list.splice(i, 1);
    this.localUnit.setPoiList(list);
    this.resetAlerts();
  }

  checkBase(): boolean {
    return this.localUnit.getStatus() != UnitStatus.BASE;
  }

  checkGoBack(): boolean {
    return this.localUnit.getStatus() == UnitStatus.BASE
      || this.localUnit.getStatus() == UnitStatus.DISCONNECTED;
  }

  checkStart(): boolean {
    return this.localUnit.getStatus() == UnitStatus.GOINGTO;
  }

  checkStop(): boolean {
    return this.localUnit.getStatus() == UnitStatus.STOP
      || this.localUnit.getStatus() == UnitStatus.BASE
      || this.localUnit.getStatus() == UnitStatus.DISCONNECTED;
  }

  checkShutdown(): boolean {
    return this.localUnit.getStatus() == UnitStatus.GOINGTO
      || this.localUnit.getStatus() == UnitStatus.STOP
      || this.localUnit.getStatus() == UnitStatus.ERROR
      || this.localUnit.getStatus() == UnitStatus.DISCONNECTED;
  }

  getMapLength(): number {
    return this.service.getMapLength();
  }

  getMapHeight(): number {
    return this.service.getMapHeight();
  }

  statusBase(status: UnitStatus): boolean {
    return status == UnitStatus.BASE;
  }

  statusGoingTo(status: UnitStatus): boolean {
    return status == UnitStatus.GOINGTO;
  }

  statusError(status: UnitStatus): boolean {
    return status == UnitStatus.ERROR;
  }

  statusStop(status: UnitStatus): boolean {
    return status == UnitStatus.STOP;
  }

  statusDisconnect(status: UnitStatus): boolean {
    return status == UnitStatus.DISCONNECTED;
  }

  statusPoi(position: Position): boolean {
    return this.service.getCell(position).isPoi();
  }
}
