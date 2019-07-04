import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { Cities } from 'src/app/interfaces/cities';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.page.html',
  styleUrls: ['./myposts.page.scss'],
})
export class MypostsPage implements OnInit {
  private loading: any;
  public products = new Array<Product>();
  public cities = new Array<Cities>();
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

    });
   
    if(this.usuario) this.showproducts();

  
  }

  ngOnInit() { 
    
    
  }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
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

   showproducts(userUid: string){
    try {
      let dados = this.productService.showproduct(this.usuario);
      console.log(dados);
    } catch (error) {
      this.presentToast('Erro ao tentar achar usuario');
    }
  }

  }

  
}