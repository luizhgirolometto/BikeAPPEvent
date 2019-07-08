import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Product } from '../interfaces/product';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsCollection: AngularFirestoreCollection<Product>;
  public comments$ : any;
  public usuario: any;


  constructor(private afs: AngularFirestore,
    private authService: AuthService,) {
    this.productsCollection = this.afs.collection<Product>('Products');
    this.usuario = this.authService.getAuth().currentUser.uid;
  }

  getProducts() {
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

  addProduct(product: Product) {
    return this.productsCollection.add(product);
  }

  getProduct(id: string) {
    return this.productsCollection.doc<Product>(id).valueChanges();
  }

  updateProduct(id: string, product: Product) {
    return this.productsCollection.doc<Product>(id).update(product);
  }

  deleteProduct(id: string) {
    return this.productsCollection.doc(id).delete();
  } 

  getUserProducts() {
    return  this.afs.collection('Products', ref => ref.where('userId', '==', this.usuario)).snapshotChanges().pipe(
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