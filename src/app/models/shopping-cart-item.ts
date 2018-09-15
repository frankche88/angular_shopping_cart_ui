import { BaseEntity } from './base-entity';

export class ShoppingCartItem extends BaseEntity {

    productId: number;
    name: string;
    pictureUrl: string;
    quantity: number;
    price: number;

    constructor(_productId: number, _name: string, _pictureUrl: string, _price: number) {
        super();
        this.id = _productId;
        this.productId = _productId;
        this.name = _name;
        this.pictureUrl = _pictureUrl;
        this.price = _price;
        this.quantity = 1;
    }

    getTotal(): number {

        return this.quantity * this.price;
    }
}
