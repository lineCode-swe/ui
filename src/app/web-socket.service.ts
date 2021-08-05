/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import {Inject, Injectable} from '@angular/core';
import {WebSocketSubject} from "rxjs/webSocket";
import {PartialObserver, Subject} from "rxjs";
import {ServerService} from "./server-service";
import {Cell} from "./cell";
import {User} from "./user";
import {Unit} from "./unit";
import {Position} from "./position";
import {AuthStatus} from "./auth-status.enum";
import {UnitStopCommand} from "./unit-stop-command.enum";
import {Direction} from "./direction.enum";
import {AUTH_SUBJ, CELL_MAP, CELL_SUBJ, UNIT_MAP, UNIT_SUBJ, USER_MAP, USER_SUBJ} from "./app.config";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements ServerService {

  private authStatus: AuthStatus = AuthStatus.NO_AUTH;
  private mapLength: number = 0;
  private mapHeight: number = 0;

  constructor(
    @Inject(CELL_MAP) private cellMap: Map<string, Cell>,
    @Inject(USER_MAP) private userMap: Map<string, User>,
    @Inject(UNIT_MAP) private unitMap: Map<string, Unit>,
    @Inject(CELL_SUBJ) private cellSubj: Subject<Cell[]>,
    @Inject(USER_SUBJ) private userSubj: Subject<User[]>,
    @Inject(UNIT_SUBJ) private unitSubj: Subject<Unit[]>,
    @Inject(AUTH_SUBJ) private authSubj: Subject<AuthStatus>,
    private socket: WebSocketSubject<any>,
  ) {
    this.socket.subscribe({
      next: (value: any) => { this.onMessage(value); }
    })
  }

  onMessage(msg: any): void {
    switch (msg.type) {
      case 'KeepAliveToUi':
        break;

      case 'AuthToUi':
        this.authStatus = msg.session;
        this.authSubj.next(this.authStatus);
        break;

      case 'UsersToUi':
        this.userMap.clear();
        msg.users.forEach(user => {
          this.userMap.set(user.username, new User(user.username, user.admin));
        })
        this.userSubj.next(Array.from(this.userMap.values()));
        break;

      case 'UnitsToUi':
        this.unitMap.clear();
        msg.units.forEach(unit => {
          this.unitMap.set(unit.id, new Unit(unit.id, unit.name, new Position(unit.base.x, unit.base.y)));
        })
        this.unitSubj.next(Array.from(this.unitMap.values()));
        break;

      case 'MapToUi':
        this.cellMap.clear();
        this.mapHeight = msg.map.height;
        this.mapLength = msg.map.length;
        msg.map.cells.forEach(cell => {
          this.cellMap.set(
            JSON.stringify(new Position(cell.position.x, cell.position.y)),
            new Cell(
              new Position(cell.position.x, cell.position.y),
              cell.locked as boolean,
              cell.poi as boolean,
              cell.base as boolean,
              cell.direction as Direction,
            ))
        });
        this.cellSubj.next(Array.from(this.cellMap.values()));
        break;

      case 'UnitStatusToUi':
        if (this.unitMap.has(msg.id)) {
          this.unitMap.get(msg.id).setStatus(msg.status);
          this.unitSubj.next(Array.from(this.unitMap.values()));
        } else {
          console.log(`Unit with ID: ${msg.id} has been requested but not found`);
        }
        break;

      case 'UnitPoiToUi':
        if (this.unitMap.has(msg.id)) {
          let poiList: Position[] = [];
          msg.poi.forEach(pos => {
            poiList.push(new Position(pos.x, pos.y))
          });
          this.unitMap.get(msg.id).setPoiList(poiList);
          this.unitSubj.next(Array.from(this.unitMap.values()));
        } else {
          console.log(`Unit with ID: ${msg.id} has been requested but not found`);
        }
        break;

      case 'UnitSpeedToUi':
        if (this.unitMap.has(msg.id)) {
          this.unitMap.get(msg.id).setSpeed(msg.speed);
          this.unitSubj.next(Array.from(this.unitMap.values()));
        } else {
          console.log(`Unit with ID: ${msg.id} has been requested but not found`);
        }
        break;

      case 'UnitErrorToUi':
        if (this.unitMap.has(msg.id)) {
          this.unitMap.get(msg.id).setError(msg.error);
          this.unitSubj.next(Array.from(this.unitMap.values()));
        } else {
          console.log(`Unit with ID: ${msg.id} has been requested but not found`);
        }
        break;

      case 'UnitPositionToUi':
        if (this.unitMap.has(msg.id)) {
          let unit: Unit = this.unitMap.get(msg.id);
          let oldPosition: Position = unit.getPosition();
          let newPosition: Position = new Position(msg.position.x, msg.position.y);
          unit.setPosition(newPosition);
          this.cellMap.get(JSON.stringify(oldPosition)).setUnit('');
          this.cellMap.get(JSON.stringify(newPosition)).setUnit(msg.id);
          this.cellSubj.next(Array.from(this.cellMap.values()));
          this.unitSubj.next(Array.from(this.unitMap.values()));
        } else {
          console.log(`Unit with ID: ${msg.id} has been requested but not found`);
        }
        break;

      case 'ObstaclesToUi':
        this.cellMap.forEach((cell: Cell) => {
          cell.setObstacle(false);
        });
        msg.obsList.forEach((position) => {
          this.cellMap.get(JSON.stringify(new Position(position.x, position.y))).setObstacle(true);
        });
        this.cellSubj.next(Array.from(this.cellMap.values()));
        break;

      default:
        console.log('Received unrecognized type of message');
        break;
    }
  }

  getAuthStatus(): AuthStatus {
    return this.authStatus;
  }

  subscribeAuth(obs: PartialObserver<AuthStatus>): void {
    this.authSubj.subscribe(obs);
  }

  getMapLength(): number {
    return this.mapLength;
  }

  getMapHeight(): number {
    return this.mapHeight;
  }

  getCell(position: Position): Cell {
    return this.cellMap.get(JSON.stringify(position));
  }

  getCells(): Cell[] {
    return Array.from(this.cellMap.values());
  }

  subscribeCells(obs: PartialObserver<Cell[]>) {
    this.cellSubj.subscribe(obs);
  }

  getUser(username: string): User {
    return this.userMap.get(username);
  }

  getUsers(): User[] {
    return Array.from(this.userMap.values());
  }

  subscribeUsers(obs: PartialObserver<User[]>) {
    this.userSubj.subscribe(obs);
  }

  getUnit(id: string): Unit {
    return this.unitMap.get(id);
  }

  getUnits(): Unit[] {
    return Array.from(this.unitMap.values());
  }

  subscribeUnits(obs: PartialObserver<Unit[]>) {
    this.unitSubj.subscribe(obs);
  }

  login(user: string, password: string): void {
    this.socket.next({
      type: 'LoginToServer',
      user: user,
      password: password,
    });
  }

  logout(): void {
    this.socket.next({
      type: 'LogoutToServer',
    });
  }

  addUser(user: string, password: string, admin: boolean): void {
    this.socket.next({
      type: 'UserToServer',
      user: user,
      password: password,
      admin: admin,
    });
  }

  deleteUser(user: string): void {
    this.socket.next({
      type: 'DeleteUserToServer',
      user: user,
    });
  }

  addUnit(id: string, name: string, base: Position): void {
    this.socket.next({
      type: 'UnitToServer',
      id: id,
      name: name,
      base: base,
    })
  }

  deleteUnit(id: string): void {
    this.socket.next({
      type: 'DeleteUnitToServer',
      id: id,
    });
  }

  start(id: string, poiList: Position[]): void {
    this.socket.next({
      type: 'UnitStartToServer',
      id: id,
      poiList: poiList,
    });
  }

  stop(id: string): void {
    this.socket.next({
      type: 'UnitStopToServer',
      id: id,
      command: UnitStopCommand.STOP,
    });
  }

  shutdown(id: string): void {
    this.socket.next({
      type: 'UnitStopToServer',
      id: id,
      command: UnitStopCommand.SHUTDOWN,
    });
  }

  goBack(id: string): void {
    this.socket.next({
      type: 'UnitStopToServer',
      id: id,
      command: UnitStopCommand.BASE,
    });
  }

  newMap(map: string): void {
    this.socket.next({
      type: 'MapToServer',
      mapConfig: map,
    });
  }
}
