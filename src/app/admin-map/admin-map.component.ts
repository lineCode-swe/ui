import {Component} from '@angular/core';
import {ServerService} from "../server-service";
import {Router} from "@angular/router";
import {MapComponent} from "../map/map.component";

@Component({
  selector: 'app-admin-map',
  templateUrl: './admin-map.component.html',
  styleUrls: ['./admin-map.component.css']
})
export class AdminMapComponent {

  private alert_map_uploaded = false;
  private alert_input_error = false;

  constructor(private router: Router, private service: ServerService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

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

  signalError(): void {
    this.alert_map_uploaded = false;
    this.alert_input_error = true;
  }

  async checkFile(): Promise<void> {
    let mapFile = (<HTMLInputElement>document.getElementById('importMap')).files[0];

    if (mapFile.type != "text/plain") {
      this.signalError();
      return;
    }

    let mapText = await mapFile.text();
    const regex = new RegExp("[x|X|b|B|p|P| |^|_|<|>|+|\\n]*");
    let valid: boolean = true;

    if (!regex.test(mapText)) {
      valid = false;
    }
    mapText = mapText.replace(/ /g, "");

    const LINE_EXPRESSION = /\r\n|\n\r|\n|\r/g;
    const mapArray = mapText.split(LINE_EXPRESSION);

    const length: number = mapArray[0].length;
    for (let row of mapArray) {
      if (row.length != length) {
        valid = false;
      }
    }

    if (!valid) {
      this.alert_map_uploaded = false;
      this.alert_input_error = true;
    }
    else {
      this.alert_map_uploaded = true;
      this.alert_input_error = false;

      this.service.newMap(mapText);
    }

    (<HTMLInputElement>document.getElementById('importMap')).files[0].slice(0, 1);
    this.refreshComponent();
    return;
  }

  refreshComponent(): void {
    // MapComponent.prototype.gridMap = [];
    // MapComponent.prototype.gridMap = this.service.getCells();
    // MapComponent.prototype.ngOnInit();

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['MapManagement']);
    });
  }
}
