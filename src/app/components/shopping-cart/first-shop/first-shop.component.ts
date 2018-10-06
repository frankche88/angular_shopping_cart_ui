import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'ng2-ui-auth';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../models/product';
import { ShoppingCart } from '../../../models/shopping-cart';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-first-shop',
  templateUrl: './first-shop.component.html',
  styleUrls: ['./first-shop.component.css']
})
export class FirstShopComponent implements OnInit, OnDestroy {
  @BlockUI() blockUI: NgBlockUI;

  subscription: Subscription = new Subscription();
  
  constructor(private _route: ActivatedRoute, private _router: Router,
    private _productService: ProductService,
    private _shoppingCartService: ShoppingCartService,
    private _auth: AuthService) { }

  ngOnInit() {

    if(this.isAuthenticated()){
      this.getProduct();
    }else{
      this._router.navigateByUrl(`/`)
    }
  }

  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isAuthenticated(): boolean {

    return this._auth.isAuthenticated();
  }


  getProduct(): void {

      this._route.params.subscribe(

        (params): void => {

          const productId: number = Number(params['productId']);
          
          if (productId === 0) { this._router.navigateByUrl(`/`);}
          
          this.blockUI.start();
          const modelSubscription = this._productService.get(productId).subscribe(
          (product: Product) => {
            this.blockUI.stop();
            this.addToCart(product);
          },
          (error: any) => {
            this.blockUI.stop();
          }
        );
    
        this.subscription.add(modelSubscription);
      
      });
  }
  
  addToCart(product: Product): void {

    this.blockUI.start();
    const modelAddSubscription = this._shoppingCartService.AddItem(product).subscribe(
      (response: ShoppingCart) => {
        this.blockUI.stop();
        this._router.navigateByUrl(`/shopping-cart`);
      },
      (error: any) => {
        this.blockUI.stop();
      }
    );

    this.subscription.add(modelAddSubscription);

  }

}
