import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  subscription: Subscription = new Subscription();
  product : Product;

  constructor(private _route: ActivatedRoute,  private _router: Router, private _productService: ProductService) { }

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

 
    let modelSubscription = this._productService.get(id).subscribe(
      (response: Product) => {
        this.product = response;
      
      },
      (error: any) => {
  
      }
    );

    this.subscription.add(modelSubscription);

  }

}
