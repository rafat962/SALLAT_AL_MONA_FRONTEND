// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   Router,
//   RouterStateSnapshot,
//   UrlTree,
// } from '@angular/router';
// import { AuthService } from './auth.Service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGurd implements CanActivate {
//   constructor(private auth: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
//     const token = localStorage.getItem('token');
//     if (token) {
//       return true;
//     } else {
//       this.router.navigate(['/']);
//       return false;
//     }
//   }
// }
