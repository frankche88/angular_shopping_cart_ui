import { Component, OnInit , OnDestroy} from '@angular/core';
import { Order } from '../../models/order';
import { Subscription } from 'rxjs';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  subscription: Subscription = new Subscription();
  constructor(private _orderCartService: OrderService) { }

  ngOnInit() {

    this.getOrders();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getOrders() {

    const getSubscription = this._orderCartService.getAll().subscribe(

      (response:  Order[]) => {
        this.orders = response;
      },
      (error: any) => {
      });

    this.subscription.add(getSubscription);
  }
}
