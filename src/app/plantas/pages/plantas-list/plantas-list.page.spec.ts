import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantasListPage } from './plantas-list.page';

describe('PlantasListPage', () => {
  let component: PlantasListPage;
  let fixture: ComponentFixture<PlantasListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantasListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantasListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
