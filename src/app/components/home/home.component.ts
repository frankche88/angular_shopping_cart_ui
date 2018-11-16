import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { PaginationResult } from 'src/app/models/pagination-result';
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pagination: Pagination = new Pagination();

  constructor(private _productService: ProductService) { }
  products: Product[];

  ngOnInit() {

    this.initializePagination();
    this.loadData();

  }

  loadData(): void {

    this._productService.gePaginatedAll(this.pagination).subscribe(
      (response: PaginationResult) => {
        this.products = response.content;
        this.pagination.totalRecords = response.totalRecords;
      },
      (error: any) => {
      });
  }

  initializePagination(): void {

    this.pagination.sortDirection = 'asc';
    this.pagination.currentPage = 1;
    this.pagination.pageSize = 10;
    this.pagination.totalRecords = 0;
  }

  pageChanged($event: number): void {

    this.pagination.currentPage = $event;
    this.loadData();

  }

}
