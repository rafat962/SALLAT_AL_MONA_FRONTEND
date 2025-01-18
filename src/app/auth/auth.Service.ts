import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  // ---------- Login ----------

  token!: string;

  login(email: string, password: string) {
    const data = {
      email: email,
      password: password,
    };
    this.http
      .post(`${environment.apiUrl}user/login`, data)
      .pipe(
        catchError((error: any) => {
          // Optionally re-throw the error to propagate it to the next subscriber
          return throwError(error.error.message);
        })
      )
      .subscribe(
        (data: any) => {
          this.toastr.success('Log in Successfully', '', {
            timeOut: 1000,
          });
          this.token = data.token;
          localStorage.setItem('token', this.token);
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 500);
        },
        (err: any) => {
          this.toastr.error(err);
        }
      );
  }

  // ---------- signup ----------

  signup(
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    phone: number,
    city: string,
    street: string,
    location: string
  ) {
    const loc = location.split(',');
    const data = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      address: {
        city: city,
        street: street,
        state: '',
      },
      phoneNumber: phone,
      location: {
        type: 'Point',
        coordinates: loc,
      },
    };

    this.http
      .post(`${environment.apiUrl}user/signup`, data)
      .pipe(
        catchError((error: any) => {
          // Optionally re-throw the error to propagate it to the next subscriber
          return throwError(error.error.message);
        })
      )
      .subscribe(
        (data: any) => {
          this.toastr.success('Sign Up Successfully', '', {
            timeOut: 1000,
          });
          this.token = data.token;
          localStorage.setItem('token', this.token);
          this.router.navigate(['/products']);
        },
        (err: any) => {
          this.toastr.error(err);
        }
      );
  }

  // ---------- getme  ----------
  getme() {
    return this.http.patch(`${environment.apiUrl}user/me`, '');
  }
}
