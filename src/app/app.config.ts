/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */

import { InjectionToken } from '@angular/core';
import { Cell } from "./cell";
import { User } from "./user";
import { Unit } from "./unit";
import { Subject } from "rxjs";
import { AuthStatus } from "./auth-status.enum";

export const CELL_MAP = new InjectionToken<Map<string, Cell>>('For cellMap injection in WebSocketService');
export const USER_MAP = new InjectionToken<Map<string, User>>('For userMap injection in WebSocketService');
export const UNIT_MAP = new InjectionToken<Map<string, Unit>>('For unitMap injection in WebSocketService');

export const CELL_SUBJ = new InjectionToken<Subject<Cell[]>>('For cellSubj injection in WebSocketService');
export const USER_SUBJ = new InjectionToken<Subject<User[]>>('For userSubj injection in WebSocketService');
export const UNIT_SUBJ = new InjectionToken<Subject<Unit[]>>('For unitSubj injection in WebSocketService');
export const AUTH_SUBJ = new InjectionToken<Subject<AuthStatus>>('For authSubj injection in WebSocketService');
