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

  navbarOpen = false;

  constructor(private service: ServerService) { }

  showMe(): void{
    let auth:AuthStatus= this.service.getAuthStatus();
    if (auth== AuthStatus.NO_AUTH){
      document.getElementById('adminUnit').hidden= true;
      document.getElementById('adminUser').hidden= true;
      document.getElementById('btn-logout').hidden= true;
    }
    else if (auth== AuthStatus.AUTH){
      document.getElementById('adminUnit').hidden= true;
      document.getElementById('adminUser').hidden= true;
      document.getElementById('btn-login').hidden= true;
    }
    else if(auth== AuthStatus.ADMIN){
      document.getElementById('btn-login').hidden= true;
    }
  }

  logout():void{
    this.service.logout();
  }

  ngOnInit(): void {
  this.showMe();

  }

  toggleNavbar(){
    this.navbarOpen=!this.navbarOpen;
  }

}
