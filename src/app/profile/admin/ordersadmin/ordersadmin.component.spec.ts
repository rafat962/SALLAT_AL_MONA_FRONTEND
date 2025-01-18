/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrdersadminComponent } from './ordersadmin.component';

describe('OrdersadminComponent', () => {
  let component: OrdersadminComponent;
  let fixture: ComponentFixture<OrdersadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
