/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import { Component } from '@angular/core';
import {ServerService} from "../server-service";

@Component({
  selector: 'app-tables-unit',
  templateUrl: './tables-unit.component.html',
  styleUrls: []
})
export class TablesUnitComponent {

  private unitId: string = '';

  constructor(private service: ServerService) { }

  getUnitId() {
    return this.unitId;
  }

  setUnitId(id: string) {
    this.unitId = id;
  }

  onUnitSelected(id: string): void {
    this.unitId = id;
  }
}
