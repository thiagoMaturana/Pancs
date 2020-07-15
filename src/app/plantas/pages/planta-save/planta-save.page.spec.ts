import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantaSavePage } from './planta-save.page';

describe('PlantaSavePage', () => {
  let component: PlantaSavePage;
  let fixture: ComponentFixture<PlantaSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantaSavePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantaSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
