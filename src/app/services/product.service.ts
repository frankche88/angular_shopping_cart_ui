import {Injectable} from '@angular/core';
import { Product } from '../models/product';
import { BaseResourceService } from './base-resource.service';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ProductService extends BaseResourceService <Product> {

    constructor(http: HttpClient) {
       
        super(http, 'products');
    }

}
