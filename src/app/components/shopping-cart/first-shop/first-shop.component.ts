import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'ng2-ui-auth';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';
import { ShoppingCart } from '../../../models/shopping-cart';

@Component({
  selector: 'app-first-shop',
  templateUrl: './first-shop.component.html',
  styleUrls: ['./first-shop.component.css']
})
export class FirstShopComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  
  constructor(private _route: ActivatedRoute, private _router: Router,
    private _productService: ProductService,
    private _shoppingCartService: ShoppingCartService,
    private _auth: AuthService) { }

  ngOnInit() {

    const formSubscription = this._route.params.subscribe(

      (params): void => {

        const id: number = Number(params['productId']);

        this.getProduct(id);
      });

    this.subscription.add(formSubscription);
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getProduct(id: number): void {

    if (id === 0) { this._router.navigateByUrl(`/`);}

      const modelSubscription = this._productService.get(id).subscribe(
      (response: Product) => {
       
        this.addToCart(response);
      },
      (error: any) => {
      }
    );

    this.subscription.add(modelSubscription);
  }
  
  addToCart(product: Product): void {

    console.log(product);
    const modelAddSubscription = this._shoppingCartService.AddItem(this.getBuyerId(), product).subscribe(
      (response: ShoppingCart) => {
        this._router.navigateByUrl(`/shopping-cart/${response.id}`);
      },
      (error: any) => {
      }
    );

    this.subscription.add(modelAddSubscription);

  }

  isAuthenticated(): boolean {

    return this._auth.isAuthenticated();
  }

  getBuyerId(): number {

     console.log(this._auth.getPayload().userId);
    return this._auth.getPayload().userId;
  }
}
