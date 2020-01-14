import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceitasListPage } from './receitas-list.page';

describe('ReceitasListPage', () => {
  let component: ReceitasListPage;
  let fixture: ComponentFixture<ReceitasListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceitasListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceitasListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
