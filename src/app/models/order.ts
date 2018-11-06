import { BaseEntity } from './base-entity';
import { OrderItem } from './order-item';

export class Order extends BaseEntity {

    firstName: string;
    lastName: string;
    address: string;
    orderDate: string;
    fullName: string;
    creditCardNumber: string;
    creditCardAuthCode: string;
    total: number;
    currency: string;
    orderItems: OrderItem[];
}
