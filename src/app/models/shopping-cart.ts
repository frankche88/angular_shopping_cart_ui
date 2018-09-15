import { BaseEntity } from './base-entity';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart extends BaseEntity {

    buyerId: number;
    items: ShoppingCartItem[];
}
