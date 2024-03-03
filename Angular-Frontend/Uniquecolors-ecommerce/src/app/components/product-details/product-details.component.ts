import { Component, OnInit } from '@angular/core';
import { Product } from '../../common/product';
import { ActivatedRoute, Route } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  products!: Product;

  constructor(private route:ActivatedRoute,
              private productService:ProductService,
              private cartService:CartService){}


  ngOnInit(): void {
      this.handleProductDetails();
  }
  handleProductDetails() {
    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProductDetails(productId).subscribe((data) => {
      this.products = data;
    });
  }

  addToCart() {
   const theCardItem = new CartItem(this.products);
   this.cartService.addToCart(theCardItem);
  }



}
