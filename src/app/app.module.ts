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
import { FormsModule } from "@angular/forms";
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MapComponent } from './map/map.component';
import { ServerService } from "./server-service";
import { WebSocketService } from "./web-socket.service";
import { Subject } from "rxjs";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { UserTableComponent } from './user-table/user-table.component';
import { UnitTableComponent } from './unit-table/unit-table.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HeaderAdminComponent,
    MapComponent,
    UserTableComponent,
    UnitTableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule
  ],
  providers: [
    { provide: ServerService, useClass: WebSocketService },
    Map,
    Subject,
    { provide: WebSocketSubject, useFactory: () => { return webSocket<any>('ws://localhost:8080/'); } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
