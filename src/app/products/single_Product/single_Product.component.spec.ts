/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Single_ProductComponent } from './single_Product.component';

describe('Single_ProductComponent', () => {
  let component: Single_ProductComponent;
  let fixture: ComponentFixture<Single_ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Single_ProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Single_ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
