import { UserList } from './../../interfaces/userlist';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Cities } from 'src/app/interfaces/cities';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AddUserlistService } from 'src/app/services/add-userlist.service';



@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  private productId: any = null;
  public product: Product = {};
  public userData: Product = {};
  public listUser: Product = {};
  public cities = new Array<Cities>();
  private loading: any;
  private productSubscription: Subscription;
  private userListSubscription: Subscription;
  private city: any;


  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing,
    private addUserlist: AddUserlistService

  ) {

    this.productId = this.activatedRoute.snapshot.params['id'];

    if (this.productId) this.loadProduct();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
    if (this.userListSubscription) this.userListSubscription.unsubscribe();
  }

  loadProduct() {

    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
    this.product = data;

      console.log(this.product);

   

    });


  }

  async addUserList() {
    await this.presentLoading();

    try {

      this.userData.userId = this.authService.getAuth().currentUser.uid;

      await this.addUserlist.insertNameList(this.userData, this.productId);
      this.loading.dismiss();
    } catch (error) {
      console.log(error);
      this.loading.dismiss()

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

  shared() {

    this.socialSharing.share('Message, image and link', null,
      'https://www.google.nl/images/srpr/logo4w.png', 'http://www.x-services.nl');
  }

}


