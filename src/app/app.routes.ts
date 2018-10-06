import { Route, RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductComponent } from './components/product/product.component';
import { OrderDetailComponent } from './components/order/order-detail/order-detail.component';
import { AuthorizationGuard } from './guards/authorization.guard';
import { FirstShopComponent } from './components/shopping-cart/first-shop/first-shop.component';
import { CheckOutComponent } from './components/check-out/check-out.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [AuthorizationGuard]
    },
    {
        path: 'order',
        component: OrderComponent,
        canActivate: [AuthorizationGuard]
    },
    {
        path: 'first-shop/:productId',
        component: FirstShopComponent,
        canActivate: [AuthorizationGuard]
    },
    {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
        canActivate: [AuthorizationGuard]
    },
    {
        path: 'product/:id',
        component: ProductComponent
    },
    {
        path: 'order-detail/:id',
        component: OrderDetailComponent,
        canActivate: [AuthorizationGuard]
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
