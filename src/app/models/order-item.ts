import { BaseEntity } from "./base-entity";

export class OrderItem extends BaseEntity {
    
    productId: number;
    productName: string;
    pictureUrl: string;
    unit: number;
    unitPrice: number;
    currency: string;
}
