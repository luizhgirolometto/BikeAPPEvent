import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Cities } from 'src/app/interfaces/cities';
import { User } from 'src/app/interfaces/user';
import { CitiesService } from 'src/app/services/cities.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private productId: string = null;
  public product: Product = {};
  public cities  = new Array<Cities>();
  public user = new Array<User>();

 
  private productSubscription: Subscription;
  private usersSubscription: Subscription;

  private loading: any;
  private city: any;
  private usuario: any;
  

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private citiesService: CitiesService,
    private userService: UserService,

  ) {

    this.productId = this.activatedRoute.snapshot.params['id'];

      this.city = this.citiesService.getCities().subscribe(cidades => {
      this.cities = cidades
    });

   



    if (this.productId) this.loadProduct();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
  }

  loadProduct() {

    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
    });
  }

  async saveProduct() {
    await this.presentLoading();
    this.usuario =  this.userService.getUserName().subscribe(usuario => {
      this.user = usuario;
        });

    
    if (this.productId) {
      try {
        await this.productService.updateProduct(this.productId, this.product);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.product.createdAt = new Date().getTime();
      this.product.userId = this.authService.getAuth().currentUser.uid;
      this.product.nameUser = this.user[0].nome;
      
      try {
        await this.productService.addProduct(this.product);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}