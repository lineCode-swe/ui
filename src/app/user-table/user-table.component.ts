import { Component, OnInit } from '@angular/core';
import { User } from "../user";
import { FormGroup, FormBuilder } from "@angular/forms";
import { ServerService } from "../server-service";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  private alert_user_created = false;
  private alert_input_fields = false;

  private users: User[];
  userForm: FormGroup = this.formBuilder.group({
    username: null,
    password: null,
    status: null
  });

  constructor(private service: ServerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.users = this.service.getUsers();

    this.service.subscribeUsers({
      next: users => { this.users = users; }
    })
  }

  getUsers(): User[] {
    return this.users;
  }

  resetAlerts(): void {
    this.alert_user_created = false;
    this.alert_input_fields = false;
  }

  getAlertUserCreated(): boolean {
    return this.alert_user_created;
  }

  getAlertInputFields(): boolean {
    return this.alert_input_fields;
  }

  setAlertUserCreated(view: boolean): void {
    this.alert_user_created = view;
  }

  setAlertInputFields(view: boolean): void {
    this.alert_input_fields = view;
  }

  onSubmit() {
    if (
      this.userForm.controls['username'].value != null &&
      this.userForm.controls['username'].value != "" &&
      this.userForm.controls['username'].value.match(/^[a-zA-Z0-9]+$/) &&

      this.userForm.controls['password'].value != null &&
      this.userForm.controls['password'].value != "" &&

      this.userForm.controls['status'].value != null
    ) {
      this.service.addUser(this.userForm.controls['username'].value, this.userForm.controls['password'].value, this.userForm.controls['status'].value);
      this.userForm.reset();

      this.resetAlerts();
      this.alert_user_created = true;
    }
    else {
      this.resetAlerts();
      this.alert_input_fields = true;
    }
  }

  deleteUser(username: string): void {
    this.service.deleteUser(username);
  }

  displayStatus(status: boolean): string {
    return status ? "Admin" : "User";
  }

}
