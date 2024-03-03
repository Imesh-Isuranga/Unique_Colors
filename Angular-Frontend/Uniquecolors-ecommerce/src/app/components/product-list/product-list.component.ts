import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;

  thePageNumber:number = 1;
  thePageSize:number = 5;
  theTotalElements:number = 0;


  previousKeyWord:string ="";

  constructor(
    private productServices: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if(this.previousKeyWord != keyword){
      this.thePageNumber = 1;      
    }


    this.previousKeyWord = keyword;

    this.productServices
    .searchProductListPaginate(this.thePageNumber-1,
                              this.thePageSize,
                              keyword).subscribe(this.processResult());
  }


  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }


    if(this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;      
    }


    this.previousCategoryId = this.currentCategoryId;

   /* this.productServices
      .getProductList(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });*/

      this.productServices.getProductListPaginate(
        this.thePageNumber-1,
        this.thePageSize,
        this.currentCategoryId
      ).subscribe(this.processResult());
  }

  updatePageSize(pageSize:string){
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }


  processResult(){
    return(data:any)=>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number+1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    }
  }
}
