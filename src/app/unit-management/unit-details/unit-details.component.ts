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

  @Input() public unitIndex: number;

  private units: Unit[] = [];
  private localunit: Unit;
  private localPoiList: Position[] = [];
  poiForm = this.formBuilder.group({
    poiX: null,
    poiY: null
  });

  constructor(private service: ServerService, private formBuilder: FormBuilder) {
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

  ngOnChanges(changes: SimpleChanges) {
    let change: SimpleChange = changes['unitIndex'];
    if (change) {
      this.unitIndex = change.currentValue;
      this.localunit = this.units[this.unitIndex];
      this.localPoiList = this.localunit.getPoiList();
    }
  }

  onSubmit(): void {
    // USARE this.service.getMapLength() && this.service.getMapHeight()
    if (
      -1 < this.poiForm.controls['poiX'].value &&
      this.poiForm.controls['poiX'].value < 4 &&

      -1 < this.poiForm.controls['poiY'].value &&
      this.poiForm.controls['poiY'].value < 3 &&

      this.poiForm.controls['poiX'].value != null &&
      this.poiForm.controls['poiY'].value != null
    )
    {
      let pos: Position = new Position(this.poiForm.controls['poiX'].value, this.poiForm.controls['poiY'].value);
      let present: boolean = false;
      for (let poi of this.localPoiList) {
        if (pos.getX() == poi.getX() && pos.getY() == poi.getY()) {
          present = true;
          alert("ATTENZIONE!\n" +
            "La posizione inserita è già presente nella lista dell'unità!");
        }
      }
      if (!present) {
        this.localPoiList.push(pos);
      }
    }
    else {
      alert("ATTENZIONE!\n" +
        "Inserita posizione non valida!\n" +
        "X deve essere compresa tra 0 e 3\n" +
        "Y deve essere compresa tra 0 e 2");
    } // USARE // this.service.getMapLength() - 1 && this.service.getMapHeight() - 1
    this.poiForm.reset();
  }

  getUnits(): Unit[] {
    return this.units;
  }

  getLocalUnit(): Unit {
    return this.localunit;
  }

  getUnitIndex(): number {
    return this.unitIndex;
  }

  setUnitIndex(i: number): void {
    this.unitIndex = i;
  }

  getLocalPoiList(): Position[] {
    return this.localPoiList;
  }

  unitStart(id: string, list: Position[]): void {
    if (list.length > 0) {
      this.service.start(id, list);
    }
    else {
      alert("ATTENZIONE!\n" +
        "La lista degli ordini è vuota!\n");
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
    this.localPoiList.splice(i, 1);
  }

  checkBase(): boolean {
    return this.localunit.getBase() != this.localunit.getPosition();
  }

  checkGoBack(): boolean {
    return this.localunit.getStatus() == UnitStatus.BASE
      || this.localunit.getStatus() == UnitStatus.DISCONNECTED;
  }

  checkStart(): boolean {
    return this.localunit.getStatus() == UnitStatus.GOINGTO
      || this.localunit.getStatus() == UnitStatus.ERROR;
  }

  checkStop(): boolean {
    return this.localunit.getStatus() == UnitStatus.STOP
      || this.localunit.getStatus() == UnitStatus.BASE
      || this.localunit.getStatus() == UnitStatus.DISCONNECTED;
  }

  checkShutdown(): boolean {
    return this.localunit.getStatus() == UnitStatus.GOINGTO
      || this.localunit.getStatus() == UnitStatus.STOP
      || this.localunit.getStatus() == UnitStatus.ERROR
      || this.localunit.getStatus() == UnitStatus.DISCONNECTED;
  }

}
