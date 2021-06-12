/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map/map.component';
import { ServerService } from "./server-service";
import { WebSocketService } from "./web-socket.service";
import { Subject } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { UserTableComponent } from './user-table/user-table.component';
import { UnitTableComponent } from './unit-table/unit-table.component';
import { AppRoutingModule } from './app-routing.module';
import { UnitManagementComponent } from './unit-management/unit-management.component';
import { UnitDetailsComponent } from './unit-management/unit-details/unit-details.component';
import { TablesUnitComponent } from './tables-unit/tables-unit.component';
import { HomeMapComponent } from './home-map/home-map.component';
import { CELL_MAP, UNIT_MAP, USER_MAP, CELL_SUBJ, AUTH_SUBJ, UNIT_SUBJ, USER_SUBJ } from "./app.config";
import { Cell } from "./cell";
import { User } from "./user";
import { Unit } from "./unit";
import { AuthStatus } from "./auth-status.enum";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MapComponent,
    UserTableComponent,
    UnitTableComponent,
    UnitManagementComponent,
    UnitDetailsComponent,
    TablesUnitComponent,
    HomeMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],

  providers: [
    { provide: ServerService, useClass: WebSocketService },
    { provide: CELL_MAP, useValue: new Map<string, Cell>()},
    { provide: USER_MAP, useValue: new Map<string, User>()},
    { provide: UNIT_MAP, useValue: new Map<string, Unit>()},
    { provide: CELL_SUBJ, useValue: new Subject<Cell[]>()},
    { provide: USER_SUBJ, useValue: new Subject<User[]>()},
    { provide: UNIT_SUBJ, useValue: new Subject<Unit[]>()},
    { provide: AUTH_SUBJ, useValue: new Subject<AuthStatus>()},
    { provide: WebSocketSubject, useFactory: () => { return webSocket<any>('ws://localhost:8080/ui'); } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
