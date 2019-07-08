import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../interfaces/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userCollection: AngularFirestoreCollection<User>;

 
  constructor(private afu: AngularFirestore) {
    this.userCollection = this.afu.collection<User>('Users');

 
  
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

  getUser(id: string) {
    return this.userCollection.doc<User>(id).valueChanges();
  }

addUser(user: User) {
  return this.userCollection.add(user);
}


updateUser(id: string, product: User) {
  return this.userCollection.doc<User>(id).update(product);
}

deleteUser(id: string) {
  return this.userCollection.doc(id).delete();
} 

}



