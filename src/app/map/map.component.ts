import { Component, OnInit } from '@angular/core';
import {WebSocketService} from "../web-socket.service";
import {Observable, Observer} from "rxjs";
import {Position} from "../position";
import {Cell} from "../cell";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private ws: WebSocketService) {
    ws.subscribeCell(this.cells);
  }

  cells: Observer<Position>;
  height: number;
  width: number;

  ngOnInit(): void { }
}
