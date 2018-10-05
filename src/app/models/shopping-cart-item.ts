import { BaseEntity } from './base-entity';

export class ShoppingCartItem {

    productId: number;
    productName: string;
    pictureUrl: string;
    quantity: number;
    unitPrice: number;
    currency: string;
    total: number;
    
    constructor(_productId: number, _productName: string,
                 _pictureUrl: string, _unitPrice: number, _currency: string) {
    
        this.productId = _productId;
        this.productName = _productName;
        this.pictureUrl = _pictureUrl;
        this.unitPrice = _unitPrice;
        this.currency = _currency;
        this.quantity = 1;
    }



}
