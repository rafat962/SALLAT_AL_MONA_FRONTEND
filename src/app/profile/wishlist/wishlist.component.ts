import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ProductService } from '../../products/products.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  constructor(
    private ProfileService: ProfileService,
    private service: ProductService,
    private toastr: ToastrService,
    private rou: Router
  ) {}
  lovelist: any = [];
  loading = true;
  api = environment.api;
  ngOnInit() {
    this.service.header.next('all');

    this.ProfileService.getme().subscribe((data: any) => {
      this.lovelist = data.user.lovelist;
      this.loading = false;
    });
  }
  // ---------- LIKE
  love(productID: string, event: any) {
    if (event.target.getAttribute('name') === 'love') {
      this.service.unlike(productID).subscribe((data) => {
        this.ProfileService.getme().subscribe((data: any) => {
          this.lovelist = data.user.lovelist;
          this.toastr.warning('تمت إزالة العنصر من قائمة العناصر المفضلة');
        });
      });
    }
  }
  // --------- CART
  quan = 1;
  cart: any[] = [];
  deletedI!: any;
  addToCart(id: any) {
    this.cart = JSON.parse(localStorage.getItem('cart')!);
    if (!this.cart) {
      this.cart = []; // Initialize cart to an empty array
    }
    let productData: any;
    for (let x of this.lovelist) {
      if (x._id === id) {
        productData = {
          name: x.name,
          price: x.price,
          size: x.size,
          id: x._id,
        };
      }
    }
    const data: any = { product: productData, quantity: this.quan };
    let exist = false;
    for (let x of this.cart) {
      if (id === x.product.id) {
        exist = true;
        this.deletedI = this.cart.indexOf(x);
      }
    }
    if (exist) {
      this.cart.splice(this.deletedI, 1);
      this.cart.push(data);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.toastr.info('هذا العنصر موجود بالفعل في السلة');
    } else {
      this.cart.push(data);
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.toastr.success('تم إضافة المنتج بنجاح');
    }
  }

  sendToProduct(id: any) {
    this.rou.navigate([`products/${id}`]);
  }
}
