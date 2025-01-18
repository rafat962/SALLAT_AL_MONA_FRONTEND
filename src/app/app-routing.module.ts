import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HeroComponent } from './products/hero/hero.component';
import { AllProductsComponent } from './products/all-Products/all-Products.component';
import { Single_ProductComponent } from './products/single_Product/single_Product.component';
import { Mange_productsComponent } from './products/mange_products/mange_products.component';
import { CartComponent } from './cart/cart.component/cart.component.component';
import { LogInComponent } from './auth/logIn/logIn.component';
import { SignUpComponent } from './auth/signUp/signUp.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { MyordersComponent } from './profile/myorders/myorders.component';
import { WishlistComponent } from './profile/wishlist/wishlist.component';
import { AddproductComponent } from './profile/admin/addproduct/addproduct.component';
import { OrdersadminComponent } from './profile/admin/ordersadmin/ordersadmin.component';
import { UsersComponent } from './profile/admin/users/users.component';
import { AiComponent } from './ai/ai.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  {
    path: 'products',
    component: Mange_productsComponent,
    children: [
      { path: '', component: HeroComponent },
      { path: 'all', component: AllProductsComponent },
      { path: ':id', component: Single_ProductComponent },
    ],
  },
  { path: 'product/:id', component: Single_ProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'settings', component: SettingsComponent },
      { path: 'myorders', component: MyordersComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'addproduct', component: AddproductComponent },
      { path: 'orders', component: OrdersadminComponent },
      { path: 'users', component: UsersComponent },
    ],
  },
  { path:'ai' , component:AiComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
