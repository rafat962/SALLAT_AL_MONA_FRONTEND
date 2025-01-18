import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('divstate', [
      state(
        'normal',
        style({
          opacity: 0,
        })
      ),
      state(
        'neww',
        style({
          opacity: 1,
        })
      ),
      transition('normal <=> neww', animate(300)),
    ]),
  ],
})
export class MainComponent implements OnInit {
  state = 'normal';
  state1 = 'normal';
  state2 = 'normal';
  state3 = 'normal';
  state4 = 'normal';
  state5 = 'normal';
  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.state = 'neww';
    }, 200);
    setTimeout(() => {
      this.state1 = 'neww';
    }, 400);
    setTimeout(() => {
      this.state2 = 'neww';
    }, 600);
    setTimeout(() => {
      this.state3 = 'neww';
    }, 800);
    setTimeout(() => {
      this.state4 = 'neww';
    }, 1000);
    setTimeout(() => {
      this.state5 = 'neww';
    }, 1200);
  }
}
