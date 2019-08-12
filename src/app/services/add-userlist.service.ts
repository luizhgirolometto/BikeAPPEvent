import { UserList } from './../interfaces/userlist';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../interfaces/product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';




@Injectable({
  providedIn: 'root'
})
export class AddUserlistService {
  private productsCollection: AngularFirestoreCollection<Product>;
  public usuario: any;
  private listEventUser: AngularFirestoreCollection<Product>;
  private productId: string = null;
  private productSubscription: Subscription;
  public product: Product = {};

  constructor(private afs: AngularFirestore,
    private authService: AuthService,) {
      this.productsCollection = this.afs.collection<Product>('Products');
      this.usuario = this.authService.getAuth().currentUser.uid;
  }

  insertNameList(userUId: Product, produto: Product) {
    return this.afs.doc('Products/' + produto).collection<any>('userlist').add(userUId);

  }

  getUserList() {
  
    return  this.afs.collection('Users', ref => ref.where('userUid', '==', this.usuario = this.authService.getAuth().currentUser.uid)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
  
          return { id, ...data };
        });
      })
    );
  }

  getProduct(id: string) {
    return this.productsCollection.doc<Product>(id).valueChanges();
  }

}