import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  product: Product;
  currentBuyerId = 1;

  constructor(private _route: ActivatedRoute, private _router: Router,
               private _productService: ProductService,
               private _shoppingCartService: ShoppingCartService) { }

  ngOnInit() {

    const formSubscription = this._route.params.subscribe(

      (params): void => {

        const id: number = Number(params['id']);

        this.getProduct(id);
      });

    this.subscription.add(formSubscription);

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  getProduct(id: number): void {

    if (id === 0) { return; }

      const modelSubscription = this._productService.get(id).subscribe(
      (response: Product) => {
        this.product = response;
      },
      (error: any) => {
      }
    );

    this.subscription.add(modelSubscription);
  }

  addToCart(): void {

    const modelAddSubscription = this._shoppingCartService.AddItem(this.currentBuyerId , this.product).subscribe(
      (response: ShoppingCart) => {
        this._router.navigateByUrl(`/shopping-cart/${response.id}`);
      },
      (error: any) => {
      }
    );

    this.subscription.add(modelAddSubscription);

  }
}
