import { UserList } from './../interfaces/userlist';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { Product } from '../interfaces/product';



@Injectable({
  providedIn: 'root'
})
export class AddUserlistService {
  private listEventUser: AngularFirestoreCollection<any>;
  private productId: string = null;
  private productSubscription: Subscription;
  public product: Product = {};

 
  constructor(private afu: AngularFirestore,
  private productService: ProductService) {

    this.listEventUser = this.afu.collection<any>('Products');
    
      }

ngOnInit() {

  this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
  this.product = data;

    console.log(this.productId);
  });
  
 }
 
    insertNameList(userUId: any) {
        console.log(userUId);
         return this.listEventUser.add(userUId);
         
        }

      
      }