/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Mange_productsComponent } from './mange_products.component';

describe('Mange_productsComponent', () => {
  let component: Mange_productsComponent;
  let fixture: ComponentFixture<Mange_productsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Mange_productsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Mange_productsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
