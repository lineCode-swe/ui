/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
 */
import {NgModule} from '@angular/core';
import {RouterModule,Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomeMapComponent} from "./home-map/home-map.component";
import {TablesUnitComponent} from "./tables-unit/tables-unit.component";
import {UserTableComponent} from "./user-table/user-table.component";
import {UnitTableComponent} from "./unit-table/unit-table.component";
import {AdminMapComponent} from "./admin-map/admin-map.component";
import {UserManualComponent} from "./user-manual/user-manual.component";

const routes: Routes=[
  {path: '', component: LoginComponent},
  {path: 'Home', component: HomeMapComponent},
  {path: 'Coordination', component: TablesUnitComponent},
  {path: 'UserManagement', component: UserTableComponent},
  {path: 'UnitManagement', component: UnitTableComponent},
  {path: 'MapManagement', component: AdminMapComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'UserManual', component: UserManualComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
