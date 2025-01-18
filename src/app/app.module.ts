import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { matrial } from './matrial';
import { HeroComponent } from './products/hero/hero.component';
import { Single_ProductComponent } from './products/single_Product/single_Product.component';
import { AllProductsComponent } from './products/all-Products/all-Products.component';
import { HeaderComponent } from './shared/header/header.component';
import { Mange_productsComponent } from './products/mange_products/mange_products.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FooterComponent } from './shared/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInceptron } from './auth/inceptron';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { CartComponent } from './cart/cart.component/cart.component.component';
import { LogInComponent } from './auth/logIn/logIn.component';
import { SignUpComponent } from './auth/signUp/signUp.component';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { ProfileComponent } from './profile/profile.component';
import { WishlistComponent } from './profile/wishlist/wishlist.component';
import { SettingsComponent } from './profile/settings/settings.component';
import { MyordersComponent } from './profile/myorders/myorders.component';
import { AddproductComponent } from './profile/admin/addproduct/addproduct.component';
import { OrdersadminComponent } from './profile/admin/ordersadmin/ordersadmin.component';
import { UsersComponent } from './profile/admin/users/users.component';
import { OrdermodelComponent } from './profile/myorders/ordermodel/ordermodel.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { IncomingordermodelComponent } from './profile/admin/ordersadmin/incomingordermodel/incomingordermodel.component';
import { UpdateadminComponent } from './products/all-Products/updateadmin/updateadmin.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AiComponent } from './ai/ai.component';

@NgModule({
  declarations: [	
    AppComponent,
    MainComponent,
    HeroComponent,
    Single_ProductComponent,
    AllProductsComponent,
    Mange_productsComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    LogInComponent,
    SignUpComponent,
    ProfileComponent,
    WishlistComponent,
    SettingsComponent,
    MyordersComponent,
    AddproductComponent,
    OrdersadminComponent,
    UsersComponent,
    OrdermodelComponent,
    IncomingordermodelComponent,
    UpdateadminComponent,
    SpinnerComponent,
      AiComponent
   ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    matrial,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInceptron,
      multi: true,
    },
    provideAnimations(), // required animations providers
    provideToastr(),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '165574748851-3t3r5bt2gso1661ifjeijpkfn201rcc7.apps.googleusercontent.com'
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
