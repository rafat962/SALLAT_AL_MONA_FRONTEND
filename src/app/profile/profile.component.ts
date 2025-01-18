import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profilecomponent.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('divstate', [
      state(
        'normal',
        style({
          opacity: 0,
        })
      ),
      state(
        'new',
        style({
          opacity: 1,
        })
      ),
      transition('normal <=> new', animate(200)),
    ]),
  ],
})
export class ProfileComponent implements OnInit {
  stata = 'normal';
  role = 'user';
  constructor(private service: ProfileService) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.stata = 'new';
    }, 200);
    this.service.getme().subscribe((data: any) => {
      this.role = data.user.role;
    });
  }
}
