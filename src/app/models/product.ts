import { BaseEntity } from '../models/base-entity';

export class Product extends BaseEntity {

    name: string;
    description: string;
    price: number;
    pictureUrl: string;
}
