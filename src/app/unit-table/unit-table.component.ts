import { Component, OnInit } from '@angular/core';
import { ServerService } from "../server-service";
import { Position } from "../position";
import { Unit } from "../unit";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-unit-table',
  templateUrl: './unit-table.component.html',
  styleUrls: ['./unit-table.component.css']
})
export class UnitTableComponent implements OnInit {

  private units: Unit[];
  unitForm: FormGroup = this.formBuilder.group({
    unitID: null,
    unitName: null,
    baseX: null,
    baseY: null
  });

  constructor(private service: ServerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.units = this.service.getUnits();

    this.service.subscribeUnits({
      next: units => { this.units = units; }
    })
  }

  getUnits(): Unit[] {
    return this.units;
  }

  deleteUnit(id: string) {
    this.service.deleteUnit(id);
  }

  onSubmit() {
    if (
      this.unitForm.controls['unitID'].value != null &&
      this.unitForm.controls['unitName'].value != null &&

      this.unitForm.controls['unitID'].value.match(/^[a-zA-Z0-9-_]+$/) &&
      this.unitForm.controls['unitName'].value.match(/^[a-zA-Z0-9]+$/) &&

      -1 < this.unitForm.controls['baseX'].value &&
      this.unitForm.controls['baseX'].value < (this.service.getMapLength()-1) &&

      -1 < this.unitForm.controls['baseY'].value &&
      this.unitForm.controls['baseY'].value < (this.service.getMapHeight()-1) &&

      this.unitForm.controls['baseX'].value != null &&
      this.unitForm.controls['baseY'].value != null
    ) {
      let pos: Position = new Position(this.unitForm.controls['baseX'].value, this.unitForm.controls['baseY'].value);
      if (this.service.getCell(pos).isBase()) {
        alert("Unit successfully created!");
        this.service.addUnit(this.unitForm.controls['unitID'].value, this.unitForm.controls['unitName'].value, pos);
        this.unitForm.reset();
      }
      else {
        alert("ERROR!\n" +
          "The coordinates inserted are not a valid Base position");
      }
    }
    else {
      alert("ERROR!\n" +
        "Name must be alphanumeric and not empty\n" +
        "X must be between 0 and " + this.service.getMapLength() + "\n" +
        "Y must be between 0 and " + this.service.getMapHeight());
    }
  }
}
