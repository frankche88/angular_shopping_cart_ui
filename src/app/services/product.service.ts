import {Injectable} from '@angular/core';
import {BaseResourceService} from '../services/base-resource.service';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { products } from '../data/product.data';
import { of } from "rxjs";

@Injectable()
export class ProductService extends BaseResourceService <Product> {
    constructor(private http: HttpClient) {
        super(http, 'products');
    }

    public getAllMock(): Observable<Product[]> {

        return of(products);
        
    }

}
