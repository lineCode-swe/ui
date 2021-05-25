/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import {Position} from './position';
import {AuthStatus} from "./auth-status.enum";
import {Cell} from "./cell";
import {PartialObserver} from "rxjs";
import {User} from "./user";
import {Unit} from "./unit";

export interface ServerService {
  getAuthStatus(): AuthStatus;
  getMapLength(): number;
  getMapHeight(): number;
  getCell(position: Position): Cell;
  getAllCell(): Cell[];
  subscribeCell(obs: PartialObserver<Position>): void;
  getUser(username: string): User;
  getAllUser(): User[];
  subscribeUser(obs: PartialObserver<string>): void;
  getUnit(id: string): Unit;
  getAllUnit(): Unit[];
  subscribeUnit(obs: PartialObserver<string>): void;
  login(user: string, password: string): void;
  logout(user: string): void;
  addUser(user: string, password: string, admin: boolean): void;
  deleteUser(user: string): void;
  addUnit(id: string, name: string, base: Position): void;
  deleteUnit(id: string): void;
  start(id: string, poiList: Position[]): void;
  stop(id: string): void;
  shutdown(id: string): void;
  goBack(id: string): void;
  newMap(map: string): void;
}
