import { Component, OnInit } from '@angular/core';
import { ProductService } from '../products.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-single_Product',
  templateUrl: './single_Product.component.html',
  styleUrls: ['./single_Product.component.css'],
})
export class Single_ProductComponent implements OnInit {
  product!: any;
  productID: string = '';
  products!: any[];
  caregorydata: any = [{ _id: 'q' }, {}];
  subscription!: Subscription;
  wind = true;
  loading = true;
  api = environment.api;
  constructor(
    private service: ProductService,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private roue: Router
  ) {
    if (window.innerWidth <= 1200) {
      this.wind = false;
    }
  }
  ngOnInit() {
    this.roue.events.subscribe((evt) => {
      // Check if the event is a NavigationEnd event
      if (evt instanceof NavigationEnd) {
        // Smooth scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth', // Use smooth behavior for smooth scrolling
        });
      }
    });
    // ---- get product id
    this.router.paramMap.subscribe((params: any) => {
      this.productID = params.params.id;
    });
    // ---- get product DATA
    this.service.getone(this.productID);
    this.service.getOneProduct().subscribe((data: any) => {
      this.product = data.product;
      if (this.product) {
        this.loading = false;
      }
      // get category data
      this.service.getall(`category=${this.product?.category}`);
      this.service.getAllProducts().subscribe((data: any) => {
        this.caregorydata = data.document;
      });
    });
    this.subscription = this.service.getAllProducts().subscribe((data: any) => {
      this.products = data.document;
    });
  }

  // --------- quatati
  quan = 1;
  add() {
    this.quan += 1;
  }
  minus() {
    if (this.quan > 1) {
      this.quan -= 1;
    }
  }

  // --------- CART
  cart: any[] = [];
  deletedI!: any;
  addToCart(id: any) {
    this.cart = JSON.parse(localStorage.getItem('cart')!);
    if (!this.cart) {
      this.cart = []; // Initialize cart to an empty array
    }
    let productData: any;
    for (let x of this.products) {
      if (x._id === id) {
        productData = {
          name: x.name,
          price: x.price,
          size: x.size,
          id: x._id,
          main_img:x.main_img
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
    this.service.bag.next(JSON.parse(localStorage.getItem('cart')!).length);
  }
  // --------- whish list
  love() {
    this.service.like(this.productID).subscribe((data) => {
      this.service.getme().subscribe((data: any) => {
        this.toastr.success('تم إضافة المنتج بنجاح الي قائمة العناصر المفضلة');
      });
    });
  }
  getonedata(id: string) {
    this.service.getone(id);
    this.service.getOneProduct().subscribe((data: any) => {
      this.product = data.product;

      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Use smooth behavior for smooth scrolling
      });
    });
  }
}
