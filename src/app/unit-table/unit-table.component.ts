import { Component } from '@angular/core';
import { ServerService } from "../server-service";
import { Position } from "../position";
import { Unit } from "../unit";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: 'app-unit-table',
  templateUrl: './unit-table.component.html',
  styleUrls: ['./unit-table.component.css']
})
export class UnitTableComponent {

  private units: Observable<Unit[]>;
  unitForm: FormGroup = this.formBuilder.group({
    unitID: null,
    unitName: null,
    baseX: null,
    baseY: null
  });

  constructor(private service: ServerService, private formBuilder: FormBuilder) {
    this.units = this.service.getUnitObservable();
  }

  getUnits(): Observable<Unit[]> {
    return this.units;
  }

  deleteUnit(id: string) {
    this.service.deleteUnit(id);
  }

  onSubmit() {
    if (
      this.unitForm.controls['unitID'].value != null &&
      this.unitForm.controls['unitName'].value != null &&

      this.unitForm.controls['unitID'].value.match(/^[0-9a-zA-Z]+$/) &&
      this.unitForm.controls['unitName'].value.match(/^[0-9a-zA-Z]+$/) &&

      -1 < this.unitForm.controls['baseX'].value &&
      this.unitForm.controls['baseX'].value < (this.service.getMapLength()-1) &&

      -1 < this.unitForm.controls['baseY'].value &&
      this.unitForm.controls['baseY'].value < (this.service.getMapHeight()-1) &&

      this.unitForm.controls['baseX'].value != null &&
      this.unitForm.controls['baseY'].value != null
    ) {
      if (typeof this.service.getUnit(this.unitForm.controls['unitID'].value) == typeof Unit) {
        alert("ERROR!" +
          "ID already existent");
      }
      else {
        alert("Unit successfully created!");
        this.service.addUnit(this.unitForm.controls['unitID'].value, this.unitForm.controls['unitName'].value,
          new Position(this.unitForm.controls['baseX'].value, this.unitForm.controls['baseY'].value));
        this.unitForm.reset();
      }
    }
    else {
      alert("ERROR!\n" +
        "ID and Name must be alphanumeric and not empty\n" +
        "X must be between 0 and " + this.service.getMapLength() + "\n" +
        "Y must be between 0 and " + this.service.getMapHeight());
    }
  }
}
