import { Injectable } from '@angular/core';
import { BaseResourceMockService } from './base-resource-mock.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Product } from '../models/product';
import { Observable, of } from 'rxjs';
import { ShoppingCartItem } from '../models/shopping-cart-item';

@Injectable()
export class ShoppingCartService extends BaseResourceMockService<ShoppingCart> {

    shoppingCart: ShoppingCart;
    constructor() {
        super([]);
    }

    AddItem(buyerId: number, product: Product): Observable<ShoppingCart> {

        if (this.shoppingCart == null) {

            this.shoppingCart = new ShoppingCart();
            this.shoppingCart.id = buyerId;
            this.shoppingCart.buyerId = buyerId;
            this.shoppingCart.items = [];
            this.shoppingCart.items.push( new ShoppingCartItem(product.id, product.name,product.pictureUrl, product.price));

        } else {

            const item = this.shoppingCart.items.find(o => o.id === product.id);

            if (item === undefined) {
                this.shoppingCart.items.push(
                    new ShoppingCartItem(product.id, product.name,
                        product.pictureUrl, product.price));
            } else {
                const index = this.shoppingCart.items.indexOf(item);
                item.quantity++;
                this.shoppingCart.items[index] = item;
            }

        }

        return this.save(this.shoppingCart, 0);

    }

    getByBuyerId(buyerId: number): Observable<ShoppingCart> {

        return this.get(buyerId);

    }

    deleteItem(buyerId: number, itemId: number): Observable<ShoppingCartItem[]> {

        const item = this.shoppingCart.items.find(o => o.id === itemId);
        const index = this.shoppingCart.items.indexOf(item);
        this.shoppingCart.items.splice(index, 1);
        return of(this.shoppingCart.items);

    }
}
