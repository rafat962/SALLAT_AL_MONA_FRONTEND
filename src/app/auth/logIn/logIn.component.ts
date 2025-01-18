import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.Service';
import { ProductService } from '../../products/products.service';

@Component({
  selector: 'app-logIn',
  templateUrl: './logIn.component.html',
  styleUrls: ['./logIn.component.css'],
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
export class LogInComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}
  stata = 'normal';
  myform!: FormGroup;

  ngOnInit() {
    this.productService.header.next('all');
    setTimeout(() => {
      this.stata = 'new';
    }, 200);
    // Form step
    this.myform = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl('', {
        validators: [Validators.min(3), Validators.required],
      }),
    });
  }

  onSubmit() {
    if (this.myform.valid) {
      this.authService.login(
        this.myform.value.email,
        this.myform.value.password
      );
    }
  }
}
