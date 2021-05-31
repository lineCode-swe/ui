/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import {Component, OnInit} from '@angular/core';
import {ServerService} from "../server-service";
import {AuthStatus} from "../auth-status.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: ServerService, private route:Router) {
    service.subscribeAuth({ //costruzione inline di un Pobserver
      next: newAuth => { this.redirectIfAuth(newAuth); }
    });
  }


  login(user: HTMLInputElement, password: HTMLInputElement):void{//dati del form da prendere e mettere come parametr
      let value: string = user.value;
      this.service.login(value,password.value);
  }

  redirectIfAuth(auth: AuthStatus):void{
    if(auth == AuthStatus.NO_AUTH){
      this.route.navigate([' ']);
    }
    if(auth == AuthStatus.AUTH){
      this.route.navigate(['/homeUser']);
    }
    else{
      this.route.navigate(['/homeAdmin'])
    }
  }

  ngOnInit(): void {
    this.redirectIfAuth(this.service.getAuthStatus());
  }

}
