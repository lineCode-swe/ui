/*
 * PORTACS
 * piattaforma di controllo mobilità autonoma
 *
 * Copyright (c) lineCode group <linecode.swe@gmail.com> 2020 - 2021
 * Distributed under ISC license (see accompanying file LICENSE).
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
      next: newAuth => { this.redirectOnInit(newAuth); }
    });
  }

  login(user: HTMLInputElement, password: HTMLInputElement): void {
    let value: string = user.value;
    this.service.login(value, password.value);
    setTimeout(() => {
      this.redirectAfterInput(this.service.getAuthStatus());
    }, 1500);
  }

  redirectOnInit(auth: AuthStatus):void {
    if (auth == AuthStatus.NO_AUTH) {
      this.route.navigate(['']);
    }
    else if (auth == AuthStatus.AUTH) {
      this.route.navigate(['/Coordination']);
    }
    else if (auth== AuthStatus.ADMIN) {
      this.route.navigate(['/UserManagement']);
    }
  }

  redirectAfterInput(auth: AuthStatus) {
    if (auth == AuthStatus.NO_AUTH) {
      alert(
        "ERROR!\n" +
        "The credentials inserted are not valid!"
      );
    }
    else if (auth == AuthStatus.AUTH) {
      this.route.navigate(['/Coordination']);
    }
    else if (auth== AuthStatus.ADMIN) {
      this.route.navigate(['/UserManagement']);
    }
  }
}
