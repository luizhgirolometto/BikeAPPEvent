import { Injectable } from '@angular/core';
import { Cities } from '../interfaces/cities';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  
  private productsCollection: AngularFirestoreCollection<Cities>;

  constructor(private afc: AngularFirestore) {
    this.productsCollection = this.afc.collection<Cities>('Cities');
  }

  getCities() {
    return this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;

          return { id, ...data };
        });
      })
    );
  }

  getCity(id: string) {
    return this.productsCollection.doc<Cities>(id).valueChanges();
  }
}