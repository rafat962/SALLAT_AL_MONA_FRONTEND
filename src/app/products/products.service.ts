import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './Product';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  // ---------- header  ----------
  header = new BehaviorSubject('all');
  // ---------- cart  ----------
  bag = new BehaviorSubject(0);
  // ---------- category  ----------
  category = '';
  // ---------- All Products ----------
  private products = new BehaviorSubject<Product>({
    name: '',
    price: 0,
    size: '',
    main_img: '',
    sub_img: [],
    ingredients: '',
    category: '',
    discount: 0,
  });
  private product = new BehaviorSubject<Product>({
    name: '',
    price: 0,
    size: '',
    main_img: '',
    sub_img: [],
    ingredients: '',
    category: '',
    discount: 0,
  });
  // func return all products
  getAllProducts() {
    return this.products.asObservable();
  }
  getOneProduct() {
    return this.product.asObservable();
  }
  // func get products from server
  getall(query: string) {
    if (localStorage.getItem('cart')) {
      this.bag.next(JSON.parse(localStorage.getItem('cart')!).length);
    }
    this.http
      .get<Product>(`${environment.apiUrl}product?${query}`)
      .subscribe((data: Product) => {
        this.products.next(data);
      });
  }
  // func get one product from server
  getone(id: string) {
    if (localStorage.getItem('cart')) {
      this.bag.next(JSON.parse(localStorage.getItem('cart')!).length);
    }
    this.http
      .get<Product>(`${environment.apiUrl}product/${id}`)
      .subscribe((data: Product) => {
        this.product.next(data);
      });
  }
  // ---------- ---------- ----------

  // ---------- Like  ----------

  like(productID: string) {
    return this.http.patch(
      `${environment.apiUrl}product/like/${productID}`,
      ''
    );
  }
  unlike(productID: string) {
    return this.http.patch(
      `${environment.apiUrl}product/unlike/${productID}`,
      ''
    );
  }

  // ---------- getme  ----------
  getme() {
    return this.http.get(`${environment.apiUrl}user/getme`);
  }
  me() {
    return this.http.get(`${environment.apiUrl}user/me`);
  }

  // ---------- PAYMENTS  ----------

  payOnRecive(data: any) {
    this.http
      .post(`${environment.apiUrl}booking`, data)
      .pipe(
        catchError((error: any) => {
          return throwError(error.error.message);
        })
      )
      .subscribe(
        (data: any) => {
          this.toastr.success('تمت عملية الشراء بنجاح', '', {
            timeOut: 1000,
          });
        },
        (err) => {}
      );
  }

  // ---------- update  ----------

  update(id: any, data: any) {
    const form = new FormData();
    form.append('name', data.name);
    form.append('price', data.price);
    form.append('ingredients', data.ingredients);
    form.append('category', data.category);
    form.append('discount', data.discount);
    form.append('code', data.code);
    form.append('size', data.size);
    if (data.main_img) {
      form.append('main_img', data.main_img);
    }
    if (data.sub_img) {
      for (let x of data.sub_img) {
        form.append('sub_img', x);
      }
    }
    this.http.patch(`${environment.apiUrl}product/${id}`, form).subscribe(
      (data: any) => {
        this.toastr.success('تم التعديل بنجاح', '', {
          timeOut: 1000,
        });
      },
      (err: any) => {
        console.log('--------');
        console.log(err);
      }
    );
  }

  // ---------- delete  ----------
  delete(id: any) {
    this.http
      .delete(`${environment.apiUrl}product/${id}`)
      .subscribe((data: any) => {
        this.toastr.warning('تم الحذف بنجاح', '', {
          timeOut: 1000,
        });
      });
  }
}
