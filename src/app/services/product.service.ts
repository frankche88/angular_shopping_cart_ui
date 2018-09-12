import {Injectable} from '@angular/core';
import { Product } from '../models/product';
import { products } from '../data/product.data';
import { BaseResourceMockService } from './base-resource-mock.service';

@Injectable()
export class ProductService extends BaseResourceMockService <Product> {

    constructor() {
       super(products);
    }

}
