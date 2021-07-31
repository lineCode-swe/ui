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
    let mapFile = (<HTMLInputElement>document.getElementById('importMap')).files[0];

    if (mapFile.type != "text/plain") {
      this.resetErrors();

      this.alert_map_uploaded = false;
      this.alert_input_error = true;
      this.alert_p_extension = true;

      return;
    }

    let mapText = await mapFile.text();
    const regex = new RegExp(/^[x|X|b|B|p|P| |^|_|<|>|+|\n]+$/g);

    if (!regex.test(mapText)) {
      this.resetErrors();

      this.alert_map_uploaded = false;
      this.alert_input_error = true;
      this.alert_p_characters = true;

      return;
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
      this.resetErrors();

      this.alert_map_uploaded = false;
      this.alert_input_error = true;
      this.alert_p_shape = true;
    }
    else {
      this.service.newMap(mapText);
    }

    (<HTMLInputElement>document.getElementById('importMap')).files[0].slice(0, 1);

    return;
  }
}
