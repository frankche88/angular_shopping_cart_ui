import {Injectable} from '@angular/core';
import {BaseResourceService} from '../services/base-resource.service';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService extends BaseResourceService <Product> {
    constructor(private http: HttpClient) {
        super(http, 'products');
    }

}
