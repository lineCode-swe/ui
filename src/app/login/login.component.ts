/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under open-source licence (see accompanying file LICENCE).
 */
import {Component} from '@angular/core';
import {ServerService} from "../server-service";
import {AuthStatus} from "../auth-status.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service: ServerService, private route:Router) {
    service.subscribeAuth({
      next: newAuth => { this.redirectIfAuth(newAuth); }
    });
  }

  login(user: HTMLInputElement, password: HTMLInputElement):void{
      let value: string = user.value;
      this.service.login(value,password.value);
      this.redirectIfAuth(this.service.getAuthStatus());
  }

  redirectIfAuth(auth: AuthStatus):void{
    if(auth == AuthStatus.NO_AUTH){
      this.route.navigate(['']);
    }
    else if(auth == AuthStatus.AUTH){
      this.route.navigate(['/UnitM']);
    }
    else if(auth== AuthStatus.ADMIN){
      this.route.navigate(['/UserT'])
    }
  }

}
