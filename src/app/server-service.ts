/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import {Position} from './position';

export interface ServerService {
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
