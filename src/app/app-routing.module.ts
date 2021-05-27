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

const routes: Routes=[
  {path: 'Login', component: LoginComponent},
  {path:'Home', component: HeaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports:[RouterModule]
})
export class AppRoutingModule { }
