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

  private alert_p_extension = false;
  private alert_p_shape = false;
  private alert_p_characters = false;

  constructor(private service: ServerService) {}

  getAlertMapUploaded(): boolean {
    return this.alert_map_uploaded;
  }

  setAlertInputError(view: boolean) {
    this.alert_p_extension = view;
    this.alert_p_shape = view;
    this.alert_p_characters = view;

    this.alert_input_error = view;
  }

  getAlertInputError(): boolean {
    return this.alert_input_error;
  }

  getAlertPExtension(): boolean {
    return this.alert_p_extension;
  }

  getAlertPShape(): boolean {
    return this.alert_p_shape;
  }

  getAlertPCharacters(): boolean {
    return this.alert_p_characters;
  }

  resetErrors(): void {
    this.alert_map_uploaded = false;
    this.alert_input_error = false;

    this.alert_p_extension = false;
    this.alert_p_shape = false;
    this.alert_p_characters = false;
  }

  async checkFile(): Promise<void> {
    let error_extension = false;
    let error_shape = false;
    let error_characters = false;
    this.resetErrors();

    let mapFile = (<HTMLInputElement>document.getElementById('importMap')).files[0];

    if (mapFile.type != "text/plain") {
      error_extension = true;
    }

    let mapText = await mapFile.text();
    const regex = new RegExp('^[xXbBpP^_<>+ \n]*$');

    console.log(regex.test(mapText));

    if (!regex.test(mapText)) {
      error_characters = true;
    }
    mapText = mapText.replace(/ /g, "");

    const LINE_EXPRESSION = /\r\n|\n\r|\n|\r/g;
    const mapArray = mapText.split(LINE_EXPRESSION);

    const length: number = mapArray[0].length;
    let valid: boolean = true;
    for (let row of mapArray) {
      if (row.length != length) {
        valid = false;
      }
    }
    if (!valid) {
      error_shape = true;
    }


    if (!error_shape && !error_extension && !error_characters) {
      this.service.newMap(mapText);
      (<HTMLInputElement>document.getElementById('importMap')).files[0].slice(0, 1);

      this.alert_map_uploaded = true;
    }
    else {
      this.alert_input_error = true;
      if (error_extension) this.alert_p_extension = true;
      if (error_shape) this.alert_p_shape = true;
      if (error_characters) this.alert_p_characters = true;
    }
  }
}
