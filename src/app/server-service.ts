/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import { Position } from './position';
import { AuthStatus } from "./auth-status.enum";
import { Cell } from "./cell";
import { PartialObserver } from "rxjs";
import { User } from "./user";
import { Unit } from "./unit";

export abstract class ServerService {
  abstract getAuthStatus(): AuthStatus;
  abstract getMapLength(): number;
  abstract getMapHeight(): number;
  abstract getCell(position: Position): Cell;
  abstract getAllCell(): Cell[];
  abstract subscribeCell(obs: PartialObserver<Position>): void;
  abstract getUser(username: string): User;
  abstract getAllUser(): User[];
  abstract subscribeUser(obs: PartialObserver<string>): void;
  abstract getUnit(id: string): Unit;
  abstract getAllUnit(): Unit[];
  abstract subscribeUnit(obs: PartialObserver<string>): void;
  abstract login(user: string, password: string): void;
  abstract logout(user: string): void;
  abstract addUser(user: string, password: string, admin: boolean): void;
  abstract deleteUser(user: string): void;
  abstract addUnit(id: string, name: string, base: Position): void;
  abstract deleteUnit(id: string): void;
  abstract start(id: string, poiList: Position[]): void;
  abstract stop(id: string): void;
  abstract shutdown(id: string): void;
  abstract goBack(id: string): void;
  abstract newMap(map: string): void;
}
