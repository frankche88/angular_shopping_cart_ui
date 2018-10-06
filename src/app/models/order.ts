import { BaseEntity } from "./base-entity";
import { OrderItem } from "./order-item";

export class Order extends BaseEntity {
   
    firstName: string;
    lastName : string;
    address : string;
    creditCardNumber: string;
    creditCardAuthCode: string;
    orderItems: OrderItem[];
}
