/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrdermodelComponent } from './ordermodel.component';

describe('OrdermodelComponent', () => {
  let component: OrdermodelComponent;
  let fixture: ComponentFixture<OrdermodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdermodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdermodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
