import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { Observable, Subject } from 'rxjs';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { BaseResourceService } from './base-resource.service';
import { HttpClient } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { MessageAlertHandleService } from '../shared/services/message-alert.service';

@Injectable()
export class ShoppingCartService extends BaseResourceService<ShoppingCart> {

    private subject = new Subject<any>();

    constructor(private http: HttpClient, private messageAlertHandleService: MessageAlertHandleService) {
        super(http, 'carts', messageAlertHandleService);
    }

    AddItem(product: Product): Observable<ShoppingCart> {

        const url = `${this.baseUrl}`;
        return this.http
            .post<ShoppingCart>(url, new ShoppingCartItem(product.id, product.name,
                product.pictureUrl, product.price, product.currency)).pipe(
                    catchError((error: any) => {
                        this.messageAlertHandleService.handleError(error);
                        return Observable.throw(error || 'Server error');
                    }));

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
                catchError((response: any) => {
                    this.messageAlertHandleService.handleError(response.error);
                    this.blockUI.stop();
                    return Observable.throw(response.error || 'Server error');
                }
                ), finalize(() => {
                    this.blockUI.stop();
                }));
    }

    public setNumberItems(numberItem: number) {
        this.subject.next({ value: numberItem });
    }

    public getNumberItems(): any {
        return this.subject.asObservable();
    }
}
