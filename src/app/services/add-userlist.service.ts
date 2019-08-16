import { UserList } from './../interfaces/userlist';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../interfaces/product';
import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})
export class AddUserlistService {
  private productsCollection: AngularFirestoreCollection<Product>;
  
  public product: Product = {};
  public userlist: UserList = {};
  

  constructor(private afs: AngularFirestore) {
      this.productsCollection = this.afs.collection<Product>('Products');
  
  }

  insertNameList(userProduto: string, userUid:UserList) {

    return this.productsCollection.doc<Product>(userProduto).collection<UserList>('userlist').add(userUid);
  

  }

  getEventUserList(id: string) {
    return this.productsCollection.doc<Product>(id).collection('userlist').valueChanges();
  }

  getListUserData(userUid: Product) {
  
    return  this.afs.collection('Users', ref => ref.where('userUid', '==', userUid)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
  
          return { id, ...data };
        });
      })
    );
  }

}