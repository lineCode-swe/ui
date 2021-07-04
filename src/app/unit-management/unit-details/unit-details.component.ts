/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
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

  @Input() public unitId: string;

  private localUnit: Unit;
  poiForm = this.formBuilder.group({
    poiX: null,
    poiY: null
  });

  constructor(private service: ServerService, private formBuilder: FormBuilder) {
    this.localUnit = this.service.getUnit(this.unitId);
  }

  ngOnChanges(changes: SimpleChanges) {
    let change: SimpleChange = changes['unitId'];
    if (change) {
      this.unitId = change.currentValue;
      this.localUnit = this.service.getUnit(this.unitId);
    }
  }

  onSubmit(): void {
    if (
      -1 < this.poiForm.controls['poiX'].value &&
      this.poiForm.controls['poiX'].value < this.service.getMapLength() &&

      -1 < this.poiForm.controls['poiY'].value &&
      this.poiForm.controls['poiY'].value < this.service.getMapHeight() &&

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
            alert("ERROR!\n" +
              "The position inserted is already existent!");
          }
        }
        if (!present) {
          let array: Position[] = this.localUnit.getPoiList();
          array.push(pos);
          this.localUnit.setPoiList(array);
        }
      }
      else {
        alert("ERROR!\n" +
          "The position inserted is not a valid Point of Interest!");
      }
    }
    else {
      alert("ERROR!\n" +
        "The position inserted is not valid!\n" +
        "X needs to be between 0 and " + (this.service.getMapLength() - 1) + '\n' +
        "Y needs to be between 0 and " + (this.service.getMapHeight() - 1));
    }
    this.poiForm.reset();
  }

  getLocalUnit(): Unit {
    return this.localUnit;
  }

  getUnitId(): string {
    return this.unitId;
  }

  setUnitIndex(i: string): void {
    this.unitId = i;
  }

  unitStart(id: string, list: Position[]): void {
    if (list.length > 0) {
      this.service.start(id, list);
    }
    else {
      alert("ERROR!\n" +
        "The order list is empty!\n");
    }
  }

  unitGoBack(id: string): void {
    this.service.goBack(id);
  }

  unitStop(id: string): void {
    this.service.stop(id);
  }

  unitShutdown(id: string): void {
    this.service.shutdown(id);
  }

  removePoi(i: number): void {
    let array: Position[] = this.localUnit.getPoiList();
    array.splice(i, 1);
    this.localUnit.setPoiList(array);
  }

  checkBase(): boolean {
    return this.localUnit.getBase() == this.localUnit.getPosition();
  }

  checkGoBack(): boolean {
    return this.localUnit.getStatus() == UnitStatus.BASE
      || this.localUnit.getStatus() == UnitStatus.DISCONNECTED;
  }

  checkStart(): boolean {
    return this.localUnit.getStatus() == UnitStatus.GOINGTO
      || this.localUnit.getStatus() == UnitStatus.ERROR;
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

}
