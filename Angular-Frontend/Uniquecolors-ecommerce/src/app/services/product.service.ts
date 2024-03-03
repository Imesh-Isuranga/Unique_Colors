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


  getProductDetails(id:number):Observable<Product>{
    const searchUrl = `${this.baseUrl}/${id}`;

    
    return this.httpClient.get<Product>(searchUrl);
  }
}

interface GetResponse{
  _embedded:{
    products:Product[];
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}
