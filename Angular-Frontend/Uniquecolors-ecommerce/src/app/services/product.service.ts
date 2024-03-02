import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = "http://localhost:8080/api/products"

  constructor(private httpClient:HttpClient) { }

  getProductList(categoryId:number):Observable<Product[]>{

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => {
        return response._embedded.products
      })
    );
  }
}

interface GetResponse{
  _embedded:{
    products:Product[];
  }
}
