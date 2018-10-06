import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  
  constructor( private _productService: ProductService) { }
  products: Product[];

  ngOnInit() {

    this.blockUI.start();

      this._productService.getAll().subscribe(
      (response: any) => {
         this.products = response;
         this.blockUI.stop();
      },
      (error: any) => {
        this.blockUI.stop();
      });

  }

}
