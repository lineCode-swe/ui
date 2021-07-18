import {Component} from '@angular/core';
import {ServerService} from "../server-service";

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.css']
})
export class AdminMapComponent {

  private alert_map_uploaded = false;
  private alert_input_error = false;

  constructor(private service: ServerService) { }

  setAlertMapUploaded(view: boolean) {
    this.alert_map_uploaded = view;
  }

  getAlertMapUploaded(): boolean {
    return this.alert_map_uploaded;
  }

  setAlertInputError(view: boolean) {
    this.alert_input_error = view;
  }

  getAlertInputError(): boolean {
    return this.alert_input_error;
  }
}
