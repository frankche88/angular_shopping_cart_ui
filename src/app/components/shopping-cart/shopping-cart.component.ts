import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartItem } from '../../models/shopping-cart-item';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  shoppingCartList: ShoppingCartItem[];
  currentBuyerId = 1;

  constructor(private _shoppingCartService: ShoppingCartService,
    private _route: ActivatedRoute, private _router: Router) {

  }

  ngOnInit() {

    const formSubscription = this._route.params.subscribe(

      (params): void => {

        const id: number = Number(params['buyerId']);

        this.getShoppingCart(id);
      });

    this.subscription.add(formSubscription);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getShoppingCart(id: number) {

    const getSubscription =  this._shoppingCartService.getByBuyerId(id).subscribe(

      (response: ShoppingCart) => {

        this.shoppingCartList = response.items;
      },
      (error: any) => {

      });

      this.subscription.add(getSubscription);
  }

  deleteItem(id: number) {

    const deleteSubscription =  this._shoppingCartService.deleteItem(this.currentBuyerId, id).subscribe(

      (response: ShoppingCartItem[]) => {

        this.shoppingCartList = response;
      },
      (error: any) => {

      });

      this.subscription.add(deleteSubscription);
  }

  getTotal(): number {

    let sum = 0;
    for (let i = 0; i < this.shoppingCartList.length; i++) {
      sum = sum + this.shoppingCartList[i].getTotal();
    }
    return sum;

  }
}
