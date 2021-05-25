/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import {Injectable} from '@angular/core';
import {WebSocketSubject} from "rxjs/webSocket";
import {PartialObserver, Subject} from "rxjs";
import {ServerService} from "./server-service";
import {Cell} from "./cell";
import {User} from "./user";
import {Unit} from "./unit";
import {Position} from "./position";
import {AuthStatus} from "./auth-status.enum";
import {UnitStopCommand} from "./unit-stop-command.enum";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements ServerService {

  private authStatus: AuthStatus = AuthStatus.NO_AUTH;
  private mapLength: number = 0;
  private mapHeight: number = 0;

  constructor(
    private cellMap: Map<Position, Cell>,
    private userMap: Map<string, User>,
    private unitMap: Map<string, Unit>,
    private cellSubj: Subject<Position>,
    private userSubj: Subject<string>,
    private unitSubj: Subject<string>,
    private socket: WebSocketSubject<any>,
  ) {
    this.socket.subscribe({
      next: (value: string) => { this.onMessage(JSON.parse(value)); }
    })
  }

  onMessage(msg: any): void {
    switch (msg.type) {
      case 'KeepAliveFromServer':
        break;

      case 'AuthFromServer':
        this.authStatus = msg.session;
        break;

      case 'UsersFromServer':
        this.userMap.clear();
        msg.users.forEach(user => {
          this.userMap.set(user.username, new User(user.username, user.admin));
        })
        this.userSubj.next('*');
        break;

      case 'UnitsFromServer':
        this.unitMap.clear();
        msg.units.forEach(unit => {
          this.unitMap.set(unit.id, new Unit(unit.id, unit.name, new Position(unit.base.x, unit.base.y)));
        })
        this.unitSubj.next('*');
        break;

      case 'MapFromServer':
        this.cellMap.clear();
        this.mapHeight = msg.map.height;
        this.mapLength = msg.map.length;
        msg.map.cells.forEach(cell => {
          this.cellMap.set(
            new Position(cell.position.x, cell.position.y),
            new Cell(
              new Position(cell.position.x, cell.position.y),
              cell.locked,
              cell.poi,
              cell.base,
              cell.direction
            )
          )
        });
        this.cellSubj.next(new Position(-1, -1));
        break;

      case 'UnitStatusFromServer':
        if (this.unitMap.has(msg.id)) {
          this.unitMap.get(msg.id).setStatus(msg.status);
          this.unitSubj.next(msg.id);
        } else {
          console.log(`Unit with ID: ${msg.id} has been requested but not found`);
        }
        break;

      case 'UnitPoiFromServer':
        if (this.unitMap.has(msg.id)) {
          let poiList: Position[] = [];
          msg.poi.forEach(pos => {
            poiList.push(new Position(pos.x, pos.y))
          });
          this.unitMap.get(msg.id).setPoiList(poiList);
          this.unitSubj.next(msg.id);
        } else {
          console.log(`Unit with ID: ${msg.id} has been requested but not found`);
        }
        break;

      case 'UnitSpeedFromServer':
        if (this.unitMap.has(msg.id)) {
          this.unitMap.get(msg.id).setSpeed(msg.speed);
          this.unitSubj.next(msg.id);
        } else {
          console.log(`Unit with ID: ${msg.id} has been requested but not found`);
        }
        break;

      case 'UnitErrorFromServer':
        if (this.unitMap.has(msg.id)) {
          this.unitMap.get(msg.id).setError(msg.error);
          this.unitSubj.next(msg.id);
        } else {
          console.log(`Unit with ID: ${msg.id} has been requested but not found`);
        }
        break;

      case 'UnitPosFromServer':
        if (this.unitMap.has(msg.id)) {
          this.unitMap.get(msg.id).setPosition(new Position(msg.position.x, msg.position.y));
          this.unitSubj.next(msg.id);
        } else {
          console.log(`Unit with ID: ${msg.id} has been requested but not found`);
        }
        break;

      default:
        console.log('Received unrecognized type of message');
        break;
    }
  }

  getAuthStatus(): AuthStatus {
    return this.authStatus;
  }

  getMapLength(): number {
    return this.mapLength;
  }

  getMapHeight(): number {
    return this.mapHeight;
  }

  getCell(position: Position): Cell {
    return this.cellMap.get(position);
  }

  getAllCell(): Cell[] {
    return Array.from(this.cellMap.values());
  }

  subscribeCell(obs: PartialObserver<Position>): void {
    this.cellSubj.subscribe(obs);
  }

  getUser(username: string): User {
    return this.userMap.get(username);
  }

  getAllUser(): User[] {
    return Array.from(this.userMap.values());
  }

  subscribeUser(obs: PartialObserver<string>): void {
    this.userSubj.subscribe(obs);
  }

  getUnit(id: string): Unit {
    return this.unitMap.get(id);
  }

  getAllUnit(): Unit[] {
    return Array.from(this.unitMap.values());
  }

  subscribeUnit(obs: PartialObserver<string>): void {
    this.unitSubj.subscribe(obs);
  }

  login(user: string, password: string): void {
    this.socket.next(JSON.stringify({
      type: 'LoginToServer',
      user: user,
      password: password,
    }));
  }

  logout(user: string): void {
    this.socket.next(JSON.stringify({
      type: 'LogoutToServer',
      user: user,
    }));
  }

  addUser(user: string, password: string, admin: boolean): void {
    this.socket.next(JSON.stringify({
      type: 'UserToServer',
      user: user,
      password: password,
      admin: admin,
    }));
  }

  deleteUser(user: string): void {
    this.socket.next(JSON.stringify({
      type: 'DeleteUserToServer',
      user: user,
    }));
  }

  addUnit(id: string, name: string, base: Position): void {
    this.socket.next(JSON.stringify({
      type: 'UnitToServer',
      id: id,
      name: name,
      base: base,
    }));
  }

  deleteUnit(id: string): void {
    this.socket.next(JSON.stringify({
      type: 'DeleteUnitToServer',
      id: id,
    }));
  }

  start(id: string, poiList: Position[]): void {
    this.socket.next(JSON.stringify({
      type: 'UnitStartToServer',
      id: id,
      poiList: poiList,
    }));
  }

  stop(id: string): void {
    this.socket.next(JSON.stringify({
      type: 'UnitStopToServer',
      id: id,
      command: UnitStopCommand.STOP,
    }));
  }

  shutdown(id: string): void {
    this.socket.next(JSON.stringify({
      type: 'UnitStopToServer',
      id: id,
      command: UnitStopCommand.SHUTDOWN,
    }));
  }

  goBack(id: string): void {
    this.socket.next(JSON.stringify({
      type: 'UnitStopToServer',
      id: id,
      command: UnitStopCommand.BASE,
    }));
  }

  newMap(map: string): void {
    this.socket.next(JSON.stringify({
      type: 'MapToServer',
      mapConfig: map,
    }));
  }
}
