import { Route, RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OrderComponent } from './components/order/order.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductComponent } from './components/product/product.component';

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
        path: 'order',
        component: OrderComponent
    },
    {
        path: 'shopping-cart',
        component: ShoppingCartComponent
    },
    {
        path: 'product/:id',
        component: ProductComponent
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

export const appRoutes: ModuleWithProviders = RouterModule.forRoot(routes);

