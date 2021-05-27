import { Component, OnInit } from '@angular/core';
import {ServerService} from "../server-service";
import {User} from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: ServerService) { }

  login(user: string, password: string):void{
  //getauthstatus se è no

  }

  ngOnInit(): void {
  }

}
