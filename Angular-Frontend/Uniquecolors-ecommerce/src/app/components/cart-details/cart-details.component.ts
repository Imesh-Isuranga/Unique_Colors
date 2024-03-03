import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{

  cartItems:CartItem[] = [];
  totalPrice:number = 0;
  totalQuantity:number = 0;

  constructor(private cartSevice:CartService){}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartSevice.cartItem;
    
    this.cartSevice.totalPrice.subscribe(data=>this.totalPrice = data);

    this.cartSevice.totalQuantity.subscribe(data=>this.totalQuantity = data);

    this.cartSevice.computeCartTotal();
  }

  incrementQuantity(theCartItem:CartItem){
    this.cartSevice.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem:CartItem){
    this.cartSevice.decrementQuantity(theCartItem);
  }

  remove(theCartItem:CartItem){
    this.cartSevice.remove(theCartItem);
  }

}
