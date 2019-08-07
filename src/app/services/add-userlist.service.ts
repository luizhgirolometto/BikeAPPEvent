import { UserList } from './../interfaces/userlist';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AddUserlistService {
  private listEventUser: AngularFirestoreCollection<any>;
 
  constructor(private afu: AngularFirestore,
    private authService: AuthService,) {
    this.listEventUser = this.afu.collection<any>('products/listUsers');
    
  }

  insertNameList(userUId: any) {
    return this.listEventUser.add(userUId);
  }
}
