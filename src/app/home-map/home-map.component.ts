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
