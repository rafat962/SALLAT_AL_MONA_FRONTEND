import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  private userId = '';

  // ---------- get user ----------
  // ---------- getme  ----------
  getme() {
    return this.http.get(`${environment.apiUrl}user/getme`);
  }
  // ---------- getorders  ----------
  getorders() {
    return this.http.get(`${environment.apiUrl}user/getmeorder`);
  }

  // ---------- update email and name ----------
  UpdateSettings(name: string, email: string) {
    this.getme().subscribe((data: any) => {
      this.userId = data.user._id;
      this.http
        .patch(`${environment.apiUrl}user/${this.userId}`, {
          name: name,
          email: email,
        })
        .pipe(
          catchError((error) => {
            return throwError(error.error.message);
          })
        )
        .subscribe(
          (date2: any) => {
            this.toastr.success('Settings changed Successfully', '', {
              timeOut: 1000,
            });
          },
          (err) => {
            this.toastr.error(err, '', {
              timeOut: 1000,
            });
          }
        );
    });
  }
  // ---------- update email and name ----------
  UpdatePassword(
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    this.http
      .patch(`${environment.apiUrl}user/UpdatePassword`, {
        pastPassword: currentPassword,
        password: newPassword,
        confirmPassword: confirmPassword,
      })
      .pipe(
        catchError((error) => {
          return throwError(error.error.message);
        })
      )
      .subscribe(
        (date2: any) => {
          this.toastr.success('Settings changed Successfully', '', {
            timeOut: 1000,
          });
        },
        (err) => {
          this.toastr.error(err);
        }
      );
  }
  //-------------------- create Post --------------------
  createPost(
    name: string,
    price: any,
    size: any,
    ingredients: any,
    category: any,
    discount: any,
    code: any,
    main_img: any,
    sub_img: any
  ) {
    const form = new FormData();
    form.append('name', name);
    form.append('price', price);
    form.append('ingredients', ingredients);
    form.append('category', category);
    form.append('discount', discount);
    form.append('code', code);
    form.append('size', size);
    form.append('main_img', main_img);

    for (let x of sub_img) {
      form.append('sub_img', x);
    }
    this.http.post(`${environment.apiUrl}product`, form).subscribe(
      (data: any) => {
        this.toastr.success('تم الاضافة بنجاح', '', {
          timeOut: 1000,
        });
      },
      (err: any) => {}
    );
  }

  // ---------- GET ALL ORDERS ----------

  getIncominhOrders() {
    return this.http.get(`${environment.apiUrl}booking`);
  }
  // ---------- GET ALL USERS ----------

  getUsers() {
    return this.http.get(`${environment.apiUrl}user`);
  }

  // ---------- GET ALL ORDERS ----------

  deleteorder(id: any) {
    return this.http.delete(`${environment.apiUrl}booking/${id}`);
  }
}
