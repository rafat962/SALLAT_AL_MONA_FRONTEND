import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TokenInceptron implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const authtoken = localStorage.getItem('token');
    const authRequest = req.clone({
      headers: req.headers.set('authorization', `Bearer ${authtoken}`),
    });
    return next.handle(authRequest);
  }
}
