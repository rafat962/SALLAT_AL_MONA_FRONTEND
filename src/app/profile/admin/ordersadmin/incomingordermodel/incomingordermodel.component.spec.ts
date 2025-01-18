/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { IncomingordermodelComponent } from './incomingordermodel.component';

describe('IncomingordermodelComponent', () => {
  let component: IncomingordermodelComponent;
  let fixture: ComponentFixture<IncomingordermodelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingordermodelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingordermodelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
