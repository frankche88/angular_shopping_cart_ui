import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartItem } from '../../models/shopping-cart-item';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  shoppingCartList: ShoppingCartItem[];
  total: number;
  constructor(private _shoppingCartService: ShoppingCartService) {

  }

  ngOnInit() {

        this.getShoppingCart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getShoppingCart() {

    const getSubscription =  this._shoppingCartService.getShoppingCart().subscribe(

      (response: ShoppingCart) => {
        this.total = response.total;
        this.shoppingCartList = response.items;
      },
      (error: any) => {

      });

      this.subscription.add(getSubscription);
  }

  deleteItem(productId: number) {

    const deleteSubscription =  this._shoppingCartService.deleteItem(productId).subscribe(

      (response: ShoppingCartItem[]) => {

        this.shoppingCartList = response;
      },
      (error: any) => {

      });

      this.subscription.add(deleteSubscription);
  }
}
