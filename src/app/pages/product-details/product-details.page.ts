import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import {  LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Cities } from 'src/app/interfaces/cities';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { UserlistPage } from 'src/app/modal/userlist/userlist.page';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  private productId: any = null;
  public product: Product = {};
  public userData: any = {};
  public DadosUser: any = {};
  public listUsers: any = [];
  public cities = new Array<Cities>();
  public dataUserList: any = {};
  public datauser: any = {};
  public nameUser: any = [];
  private loading: any;
  private productSubscription: Subscription;
  

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing,
    public modalCtrl: ModalController



  ) {

    this.productId = this.activatedRoute.snapshot.params['id'];
    if (this.productId) this.loadProduct();


  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
   
  }

  async loadProduct() {
    //traz todos os products / eventos
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;

    });
   
  }


  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

  shared() {

    this.socialSharing.share('Message, image and link', null,
      'https://www.google.nl/images/srpr/logo4w.png', 'http://www.x-services.nl');
  }

  async UserList () {

    console.log(this.productId);

    const modal = await this.modalCtrl.create({
      component: UserlistPage,
      componentProps: {
        'RecepProduct': this.productId
      }
    });
    return await modal.present();
  }

}


