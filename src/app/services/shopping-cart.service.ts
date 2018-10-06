import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { BaseResourceService } from './base-resource.service';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ShoppingCartService extends BaseResourceService<ShoppingCart> {

    constructor(private http: HttpClient) {
        super(http, 'carts');
    }

    AddItem(product: Product): Observable<ShoppingCart> {
        
        const url = `${this.baseUrl}`;
        return this.http
            .post<ShoppingCart>(url, new ShoppingCartItem(product.id, product.name,
                product.pictureUrl, product.price, product.currency)).pipe(
            catchError((error: any) => Observable.throw(error || 'Server error')));
 
    }

    getShoppingCart(): Observable<ShoppingCart> {

        return this.get(0);

    }

    deleteShoppingCart(): Observable<any> {

        return this.delete(0);

    }

    deleteItem(productId: number): Observable<ShoppingCartItem[]> {

        const url = `${this.baseUrl}/product/${productId}`;
        return this.http
            .delete<ShoppingCartItem[]>(url).pipe(
            catchError((error: any) => Observable.throw(error || 'Server error')));
    }
}
