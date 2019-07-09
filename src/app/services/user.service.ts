import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userCollection: AngularFirestoreCollection<User>;
  public usuario: any;
 
  constructor(private afu: AngularFirestore,
    private authService: AuthService,) {
    this.userCollection = this.afu.collection<User>('Users');
    this.usuario = this.authService.getAuth().currentUser.uid;
  }

getUsers() {
  return this.userCollection.snapshotChanges().pipe(
    map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;

        return { id, ...data };
      });
    })
  );
}

addUser(user: User) {
  return this.userCollection.add(user);
}

getUser(id: string) {
  return this.userCollection.doc<User>(id).valueChanges();
}

updateUser(id: string, product: User) {
  return this.userCollection.doc<User>(id).update(product);
}

deleteUser(id: string) {
  return this.userCollection.doc(id).delete();
} 

getNameUser() {
  return  this.afu.collection('Users', ref => ref.where('userUid', '==', this.usuario)).snapshotChanges().pipe(
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



