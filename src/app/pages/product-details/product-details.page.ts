import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  private loading: any;
  public products = new Array<Product>();
  private productsSubscription: Subscription;

  private usuario : any;


  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private productService: ProductService,
    private toastCtrl: ToastController,
   
  ) {
      
    this.productsSubscription = this.productService.getProducts().subscribe(data => {
      this.products = data;

      // codigo do usuario logado
     this.usuario = this.authService.getAuth().currentUser.uid;
     console.log(this.usuario);
    });
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  async logout() {
    await this.presentLoading();

    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async deleteProduct(id: string) {
    try {
      await this.productService.deleteProduct(id);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}


