import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "../user";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ServerService } from "../server-service";
import {Unit} from "../unit";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {

  private users: Observable<User[]>;
  userForm: FormGroup = this.formBuilder.group({
    username: null,
    password: null,
    status: null
  });

  constructor(private service: ServerService, private formBuilder: FormBuilder) {
    this.users = this.service.getUserObservable();
  }

  getUsers(): Observable<User[]> {
    return this.users;
  }

  onSubmit() {
    if (
      this.userForm.controls['username'].value != null &&
      this.userForm.controls['password'].value != null &&
      this.userForm.controls['status'].value != null &&
      this.userForm.controls['username'].value.match(/^[a-zA-Z0-9]+$/)
    ) {
      if (typeof this.service.getUser(this.userForm.controls['username'].value) == typeof User) {
        alert("ERROR!" +
          "Username already existent");
      }
      else {
        alert("User successfully created!");
        this.service.addUser(this.userForm.controls['username'].value, this.userForm.controls['password'].value, this.userForm.controls['status'].value);
        this.userForm.reset();
      }
    }
    else {
      alert("ERROR!\n" +
        "Username must be alphanumeric\n" +
        "Username and Password must not be empty\n" +
        "A Status must be selected");
    }
  }

  deleteUser(username: string) {
    this.service.deleteUser(username);
  }

}
