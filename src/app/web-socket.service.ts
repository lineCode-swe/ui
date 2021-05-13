/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from "rxjs/webSocket";
import {Subject} from "rxjs";
import {ServerService} from "./server-service";
import {Cell} from "./cell";
import {User} from "./user";
import {Unit} from "./unit";
import {Position} from "./position";
import {LoginToServer} from "./message/login-to-server";
import {LogoutToServer} from "./message/logout-to-server";
import {UserToServer} from "./message/user-to-server";
import {DeleteUserToServer} from "./message/delete-user-to-server";
import {UnitToServer} from "./message/unit-to-server";
import {UnitStartToServer} from "./message/unit-start-to-server";
import {UnitStopCommand} from "./message/unit-stop-command.enum";
import {UnitStopToServer} from "./message/unit-stop-to-server";
import {MapToServer} from "./message/map-to-server";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements ServerService {

  constructor(
    private socket: WebSocketSubject<any>,
    private subjCells: Subject<Cell[]>,
    private subjUsers: Subject<User[]>,
    private subjUnits: Subject<Unit[]>,
  ) {}

  login(user: string, password: string): void {
    this.socket.next(JSON.stringify(new LoginToServer(user, password)));
  }

  logout(user: string): void {
    this.socket.next(JSON.stringify(new LogoutToServer(user)));
  }

  addUser(user: string, password: string, admin: boolean): void {
    this.socket.next(JSON.stringify(new UserToServer(user, password, admin)));
  }

  deleteUser(user: string): void {
    this.socket.next(JSON.stringify(new DeleteUserToServer(user)));
  }

  addUnit(id: string, name: string, base: Position): void {
    this.socket.next(JSON.stringify(new UnitToServer(id, name, base)));
  }

  deleteUnit(id: string): void {
    this.socket.next(JSON.stringify(new DeleteUserToServer(id)));
  }

  start(id: string, poiList: Position[]): void {
    this.socket.next(JSON.stringify(new UnitStartToServer(id, poiList)));
  }

  stop(id: string): void {
    this.socket.next(JSON.stringify(new UnitStopToServer(id, UnitStopCommand.STOP)));
  }

  shutdown(id: string): void {
    this.socket.next(JSON.stringify(new UnitStopToServer(id, UnitStopCommand.SHUTDOWN)));
  }

  goBack(id: string): void {
    this.socket.next(JSON.stringify(new UnitStopToServer(id, UnitStopCommand.BASE)));
  }

  newMap(map: string): void {
    this.socket.next(JSON.stringify(new MapToServer(map)));
  }
}
