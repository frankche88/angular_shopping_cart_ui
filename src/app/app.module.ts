import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { ProductComponent } from './components/product/product.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { appRoutes } from './app.routes';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { AuthConfig } from './auth-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JsonInterceptorService } from './shared/services/json-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { ProductItemComponent } from './components/home/product-item/product-item.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { CustomerSectionComponent } from './components/order/customer-section/customer-section.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { AuthorizationGuard } from './guards/authorization.guard';
import { FirstShopComponent } from './components/shopping-cart/first-shop/first-shop.component';
import { BlockUIModule } from 'ng-block-ui';
import { ToastrModule } from 'ngx-toastr';
import { MessageAlertHandleService } from './shared/services/message-alert.service';
import { CheckOutComponent } from './components/check-out/check-out.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    OrderComponent,
    ProductComponent,
    ShoppingCartComponent,
    HeaderComponent,
    FooterComponent,
    ProductItemComponent,
    OrderDetailComponent,
    CustomerSectionComponent,
    FirstShopComponent,
    CheckOutComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    appRoutes,
    Ng2UiAuthModule.forRoot(AuthConfig),
    ToastrModule.forRoot(),
    BlockUIModule.forRoot(
      {
        message: 'Please wait...'
      }
    )
  ],
  providers: [ MessageAlertHandleService, AuthorizationGuard, JsonInterceptorService, ProductService,
    ShoppingCartService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JsonInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
