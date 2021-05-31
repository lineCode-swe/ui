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
import {HeaderComponent} from "./header/header.component";
import {HeaderAdminComponent} from "./header-admin/header-admin.component";
import {AppComponent} from "./app.component";

const routes: Routes=[
  {path: '', component: AppComponent },
  {path:'homeAdmin', component: HeaderAdminComponent},
  {path:'homeUser', component: HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
