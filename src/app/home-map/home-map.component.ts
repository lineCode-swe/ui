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
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.css']
})
export class HomeMapComponent {
  constructor(private service: ServerService) {
    console.log("--- Mappa ---");
    console.log(this.service.getCells());
    console.log("--- Mappa ---");
  }
}
