import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _productService: ProductService) {

  }

  ngOnInit() {

 /*    this._productService.get(1).subscribe(
      (response: any) => {

      },
      (error: any) => {

      }); */

  }

}
