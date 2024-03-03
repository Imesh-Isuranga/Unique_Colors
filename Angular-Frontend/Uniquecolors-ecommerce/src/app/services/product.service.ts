import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { response } from 'express';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products"
  private categoryUrl = "http://localhost:8080/api/product-category"

  constructor(private httpClient:HttpClient) { }

  getProductListPaginate(thePage:number,
                         thePageSize:number,
                         categoryId:number):Observable<GetResponse>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
                        + `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponse>(searchUrl);
  }


  getProductList(categoryId:number):Observable<Product[]>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => {
        return response._embedded.products
      })
    );
  }

  getProductCategories():Observable<ProductCategory[]>{
    
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => {
        return response._embedded.productCategory;
      })
    );
  }

  searchProducts(keyword:string):Observable<Product[]>{

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => {
        return response._embedded.products;
      })
    );
  }

  searchProductListPaginate(thePage:number,
    thePageSize:number,
    keyword:string):Observable<GetResponse>{

const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`
   + `&page=${thePage}&size=${thePageSize}`;

return this.httpClient.get<GetResponse>(searchUrl);
}


  getProductDetails(id:number):Observable<Product>{
    const searchUrl = `${this.baseUrl}/${id}`;

    
    return this.httpClient.get<Product>(searchUrl);
  }
}

interface GetResponse{
  _embedded:{
    products:Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}
