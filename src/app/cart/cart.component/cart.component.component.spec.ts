/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Cart.componentComponent } from './cart.component.component';

describe('Cart.componentComponent', () => {
  let component: Cart.componentComponent;
  let fixture: ComponentFixture<Cart.componentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cart.componentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cart.componentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
