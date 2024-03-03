import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  products: Product[] = [];

  constructor(private router:Router) {}

  ngOnInit(): void {
  }

  doSearch(keyword: string) {
    this.router.navigateByUrl(`/search/${keyword}`)
  }
}
