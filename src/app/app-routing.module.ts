/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {HomeMapComponent} from "./home-map/home-map.component";
import {TablesUnitComponent} from "./tables-unit/tables-unit.component";
import {UserTableComponent} from "./user-table/user-table.component";
import {UnitTableComponent} from "./unit-table/unit-table.component";

const routes: Routes=[
  {path: '', component: HomeMapComponent},
  {path:'UnitM', component: TablesUnitComponent},
  {path: 'UserT', component: UserTableComponent},
  {path:'UnitT', component: UnitTableComponent},
  {path: 'Login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
