import { UserList } from './../interfaces/userlist';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Product } from '../interfaces/product';



@Injectable({
  providedIn: 'root'
})
export class AddUserlistService {
  private listEventUser: AngularFirestoreCollection<Product>;


  constructor(private afu: AngularFirestore) {

    this.listEventUser = this.afu.collection<Product>('Products').doc<UserList>('UserList').collection<any>('Lista de usuários');

  }


  insertNameList(userUId: Product) {
    console.log(userUId)
    return this.listEventUser.add(userUId);

  }


}