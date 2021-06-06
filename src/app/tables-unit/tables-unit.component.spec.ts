import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablesUnitComponent } from './tables-unit.component';

describe('TablesUnitComponent', () => {
  let component: TablesUnitComponent;
  let fixture: ComponentFixture<TablesUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablesUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablesUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
