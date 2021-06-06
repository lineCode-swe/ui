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
    service.subscribeAuth({
      next: newAuth => { this.redirectIfAuth(newAuth); }
    });
  }


  login(user: HTMLInputElement, password: HTMLInputElement):void{
      let value: string = user.value;
      this.service.login(value,password.value);
  }

  redirectIfAuth(auth: AuthStatus):void{
    if(auth == AuthStatus.NO_AUTH){
      this.route.navigate([' ']);
    }
    if(auth == AuthStatus.AUTH){
      this.route.navigate(['/Table']);
    }
    else{
      this.route.navigate(['/User'])
    }
  }

  ngOnInit(): void {
    this.redirectIfAuth(this.service.getAuthStatus());
  }

}
