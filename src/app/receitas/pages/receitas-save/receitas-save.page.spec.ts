import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitasSavePage } from './receitas-save.page';

describe('ReceitasSavePage', () => {
  let component: ReceitasSavePage;
  let fixture: ComponentFixture<ReceitasSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitasSavePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitasSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
