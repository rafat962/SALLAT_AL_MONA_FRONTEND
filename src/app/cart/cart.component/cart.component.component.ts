import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { ProductService } from '../../products/products.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart.component',
  templateUrl: './cart.component.component.html',
  styleUrls: ['./cart.component.component.css'],
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
      transition('normal <=> neww', animate(400)),
    ]),
    trigger('divstate2', [
      state(
        'normal',
        style({
          opacity: 1,
          transform: 'translateY(0)',
        })
      ),
      state(
        'neww',
        style({
          opacity: 0,
          transform: 'translateY(100px)',
        })
      ),
      transition('normal <=> neww', animate(300)),
    ]),
  ],
})
export class CartComponent implements OnInit {
  //cart state
  cartState!: string;
  totleOne = 0;
  totle = 0;
  state = 'normal';
  constructor(
    private rou: Router,
    private toster: ToastrService,
    private service: ProductService
  ) {
    if (localStorage.getItem('cart')) {
      if (localStorage.getItem('cart')?.length === 2) {
        this.cartState = 'empty';
      } else {
        this.cartState = 'full';
      }
    } else {
      this.cartState = 'empty';
    }
  }

  ngOnInit() {
    this.service.bag.next(JSON.parse(localStorage.getItem('cart')!).length);
    //---- get user
    // -- cart
    this.cart = JSON.parse(localStorage.getItem('cart')!);

    if (!this.cart) {
      this.cart = []; // Initialize cart to an empty array
    }
    // animation
    setTimeout(() => {
      this.state = 'neww';
    }, 300);
    this.caltotal();
  }

  //CART
  cart: any = [];
  // --------- quatati
  add(id: any, q: any) {
    q += 1;
    this.cart[id].quantity += 1;
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.cart)!);
    this.totle = 0;
    this.caltotal();
  }
  minus(id: any, q: any) {
    if (q > 1) {
      q -= 1;
      this.cart[id].quantity -= 1;
      localStorage.removeItem('cart');
      localStorage.setItem('cart', JSON.stringify(this.cart)!);
    }
    this.totle = 0;
    this.caltotal();
  }
  // --------- delete item
  delete(id: any) {
    this.cart.splice(id, 1);
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(this.cart)!);
    this.totle = 0;
    this.caltotal();
    this.service.bag.next(JSON.parse(localStorage.getItem('cart')!).length);
  }
  // --------- delete item
  temp_total!: number;
  caltotal() {
    this.temp_total = 0;
    for (let x of this.cart) {
      this.temp_total = x.quantity * x.product.price;

      this.totle += this.temp_total;
      this.temp_total = 1;
    }
  }

  // ------- payments
  user = localStorage.getItem('token');
  payonget() {
    if (!this.user) {
      this.toster.info('لعمليات الشراء يجب عليك انشأ حساب', '', {
        timeOut: 3000,
      });
      this.rou.navigate(['signup']);
    }
    this.service.getme().subscribe((user: any) => {
      const cart: any = JSON.parse(localStorage.getItem('cart')!);
      const finalCart: any[] = [];
      for (let x of cart) {
        finalCart.push({
          product: x.product.id,
          quantity: x.quantity,
        });
      }
      const data = {
        products: finalCart,
        user: user.user._id,
        price: +this.totle,
        paid: false,
      };
      this.service.payOnRecive(data);
    });
  }
}
