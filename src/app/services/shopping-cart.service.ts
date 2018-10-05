import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';
import { ShoppingCartItem } from '../models/shopping-cart-item';
import { BaseResourceService } from './base-resource.service';
import { HttpClient } from '@angular/common/http';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class ShoppingCartService extends BaseResourceService<ShoppingCart> {

    constructor(http: HttpClient) {
       
        super(http, 'carts');
    }

    AddItem(product: Product): Observable<ShoppingCart> {

             return  this.getShoppingCart().pipe(
                    flatMap(
                            shoppingCart => {
                                const item = shoppingCart.items.find(o => o.productId == product.id);
                                if (item === undefined) {
                                    shoppingCart.items.push(new ShoppingCartItem(product.id, product.name,
                                        product.pictureUrl, product.price, product.currency));
                                } else {
                                    const index = shoppingCart.items.indexOf(item);
                                    item.quantity++;
                                    shoppingCart.items[index] = item;
                                }
                                return this.save(shoppingCart, 0);
                            }
                    )
                );
    }

    getShoppingCart(): Observable<ShoppingCart> {

        return this.get(0);

    }

    deleteShoppingCart(): Observable<any> {

        return this.delete(0);

    }

    deleteItem(itemId: number): Observable<ShoppingCartItem[]> {

        let shoppingCart = new ShoppingCart();
      /*   const item = this.shoppingCart.items.find(o => o.id === it
        emId);
        const index = this.shoppingCart.items.indexOf(item);
        this.shoppingCart.items.splice(index, 1); */
        return of(shoppingCart.items);

    }
}
