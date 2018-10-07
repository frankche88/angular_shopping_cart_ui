import { Injectable } from '@angular/core';
import { BaseResourceService } from './base-resource.service';
import { HttpClient } from '@angular/common/http';
import { MessageAlertHandleService } from '../shared/services/message-alert.service';
import { Order } from '../models/order';
@Injectable()
export class OrderService extends BaseResourceService<Order> {

    constructor(http: HttpClient, messageAlertHandleService: MessageAlertHandleService) {

        super(http, 'orders', messageAlertHandleService);
    }

}
