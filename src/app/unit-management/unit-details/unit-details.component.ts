/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import { Component, Input} from '@angular/core';
import { ServerService } from "../../server-service";
import { Unit } from "../../unit";
import { Position } from "../../position";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-unit-details',
  templateUrl: './unit-details.component.html',
  styleUrls: ['./unit-details.component.css']
})
export class UnitDetailsComponent {

  private units: Observable<Unit[]>;
  @Input() public unitID: string;
  private localPoiList: Position[];

  constructor(private service: ServerService, public _router: Router, public _location: Location) {

  }

  getUnits(): Observable<Unit[]> {
    return this.units;
  }

  getUnitID(): string {
    return this.unitID;
  }

  getLocalPoiList(): Position[] {
    return this.localPoiList;
  }

  unitStart(id: string, poiList: Position[]): void {
    this.service.start(id, poiList);
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

  refreshComponent(): void {
    // TO DO
  }

  addPoi(): void {


    this.refreshComponent();
  }

  removePoi(i: number): void {
    let temp: Position[] = [];
    let j: number = 0;

    while ( j < this.getLocalPoiList().length) {
      if (j != i) {
        temp[j] = this.getUnits()[i];
        j++;
        i++;
      }
      else {
        i++;
      }
    }
    this.localPoiList = temp;

    this.refreshComponent();
  }

}
