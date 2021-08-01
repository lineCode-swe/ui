/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */
import { Position } from './position';
import { AuthStatus } from "./auth-status.enum";
import { Cell } from "./cell";
import { PartialObserver } from "rxjs";
import { User } from "./user";
import { Unit } from "./unit";

export abstract class ServerService {
  abstract getAuthStatus(): AuthStatus;
  abstract subscribeAuth(obs: PartialObserver<AuthStatus>): void;
  abstract getMapLength(): number;
  abstract getMapHeight(): number;
  abstract getCell(position: Position): Cell;
  abstract getCells(): Cell[];
  abstract subscribeCells(obs: PartialObserver<Cell[]>): void;
  abstract getUser(username: string): User;
  abstract getUsers(): User[];
  abstract subscribeUsers(obs: PartialObserver<User[]>): void;
  abstract getUnit(id: string): Unit;
  abstract getUnits(): Unit[];
  abstract subscribeUnits(obs: PartialObserver<Unit[]>): void;
  abstract login(user: string, password: string): void;
  abstract logout(): void;
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
