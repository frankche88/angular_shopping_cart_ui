import {Injectable} from '@angular/core';
import { Product } from '../models/product';
import { BaseResourceService } from './base-resource.service';
import { HttpClient } from '@angular/common/http';
import { MessageAlertHandleService } from '../shared/services/message-alert.service';
@Injectable()
export class ProductService extends BaseResourceService <Product> {

    constructor(http: HttpClient, messageAlertHandleService : MessageAlertHandleService) {
       
        super(http, 'products', messageAlertHandleService);
    }

}
