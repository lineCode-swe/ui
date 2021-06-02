/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import {Component, OnInit} from '@angular/core';
import {AuthStatus} from "../auth-status.enum";
import {ServerService} from "../server-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private service: ServerService) {}


  showMe(): void{
    let auth:AuthStatus= this.service.getAuthStatus();
    if (auth== AuthStatus.NO_AUTH){
      document.getElementById('adminUnit').hidden= true;
      document.getElementById('adminUser').hidden= true;
    }
    if (auth== AuthStatus.AUTH){
      document.getElementById('adminUnit').hidden= true;
      document.getElementById('adminUser').hidden= true;
    }
    else{
    }
  }

  ngOnInit(): void {
  this.showMe();

  }

  navbarOpen=false;
  toggleNavbar(){
    this.navbarOpen=!this.navbarOpen;
  }





}
