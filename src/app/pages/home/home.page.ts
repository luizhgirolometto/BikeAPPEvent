import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';





@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private loading: any;
  public products = new Array<Product>();
  public usuarios = new Array<User>();
  private productsSubscription: Subscription;
  private userSubscription: Subscription;

  textoBuscar = '';

  

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private productService: ProductService,
    private toastCtrl: ToastController,
    private userService: UserService,
    public modalCtrl: ModalController

  ) {

    this.productsSubscription = this.productService.getProducts().subscribe(data => {
      this.products = data;
    });

    this.userSubscription = this.userService.getNameUser().subscribe(usuario => {
      this.usuarios = usuario;
    });



  }

  ngOnInit() { }

  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
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

 

  async buscarUsuario(event) {

    const texto = event.target.value;
    this.textoBuscar = texto;


  }
}