import { UserList } from './../interfaces/userlist';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../interfaces/product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AddUserlistService {
  private listEventUser: AngularFirestoreCollection<Product>;
  private productId: string = null;
  private productSubscription: Subscription;
  public product: Product = {};

  constructor(private afs: AngularFirestore,
    private productService: ProductService) {
    
  }



  insertNameList(userUId: Product, produto: Product) {
    return this.afs.doc('Products/' + produto).collection<any>('userlist').add(userUId);

  }


}