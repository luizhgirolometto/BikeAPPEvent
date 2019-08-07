import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Product } from '../interfaces/product';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AddUserlistService {
  private listEventUser: AngularFirestoreCollection<Product>;
 
  constructor(private afu: AngularFirestore,
    private authService: AuthService,) {
    this.listEventUser = this.afu.collection<Product>('products/listUsers');
    
  }

  insertNameList(userUId: Product) {
    return this.listEventUser.add(userUId);
  }
}
