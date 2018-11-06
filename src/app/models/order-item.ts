import { BaseEntity } from './base-entity';

export class OrderItem extends BaseEntity {

    productId: number;
    productName: string;
    pictureUrl: string;
    unit: number;
    unitPrice: number;
    total: number;
    currency: string;

    constructor(_productId: number, _productName: string,
        _pictureUrl: string,
        _unit: number, _unitPrice: number,
         _currency: string, _total: number) {
        super();

        this.productId = _productId;
        this.productName = _productName;
        this.pictureUrl = _pictureUrl;
        this.unit = _unit;
        this.unitPrice = _unitPrice;
        this.currency = _currency;
        this.total = _total;
    }

}
