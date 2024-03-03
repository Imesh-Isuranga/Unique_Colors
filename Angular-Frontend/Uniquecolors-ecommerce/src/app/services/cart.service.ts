import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItem:CartItem[] = [];

  totalPrice:Subject<number> = new Subject<number>();
  totalQuantity:Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCardItem: CartItem) {
    let alreadyExistingInCart : boolean = false;
    let existingCartItem : CartItem | undefined;


    if(this.cartItem.length>0){
      /*for(let tempCartItems of this.cartItem){
        if(tempCartItems === theCardItem){
          existingCartItem = tempCartItems;
          break;
        }
      }*/

      existingCartItem = this.cartItem.find(tempCartItem => tempCartItem.id === theCardItem.id);
  
      alreadyExistingInCart = (existingCartItem != undefined);
    }

      if(alreadyExistingInCart){
        existingCartItem!.quatity++;
      }else{
        this.cartItem.push(theCardItem);
      }
    
    this.computeCartTotal();
  }

  decrementQuantity(theCardItem:CartItem){
    theCardItem.quatity--;

    if(theCardItem.quatity === 0){
      this.remove(theCardItem);
    }else{
      this.computeCartTotal();
    }
  }

  remove(theCardItem:CartItem){
    const itemIndex = this.cartItem.findIndex(tempCartItem => tempCartItem.id === theCardItem.id);

    if(itemIndex>-1){
      this.cartItem.splice(itemIndex,1);
      this.computeCartTotal();
    }
  }

  computeCartTotal(){
    let totalPriceValue:number = 0;
    let totalQuantityValue:number = 0;

    for(let currentCartItem of this.cartItem){
      totalPriceValue += currentCartItem.quatity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quatity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    
  }
}
