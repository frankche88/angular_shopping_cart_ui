import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  order: Order;

  constructor(private _route: ActivatedRoute,
    private _router: Router, private _orderCartService: OrderService) { }

  ngOnInit() {

    const formSubscription = this._route.params.subscribe(

      (params): void => {

        const id: number = Number(params['id']);

        this.getOrder(id);
      });

    this.subscription.add(formSubscription);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getOrder(id: number): void {

    if (id === 0) { return; }

    const modelSubscription = this._orderCartService.get(id).subscribe(
      (response: Order) => {
        this.order = response;
      },
      (error: any) => {
      }

    );

    this.subscription.add(modelSubscription);
  }

}
