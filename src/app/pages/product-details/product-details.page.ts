import { UserService } from './../../services/user.service';
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
  public listUsers: any = {};
  public cities = new Array<Cities>();
  public dataUserList: any = {};
  public datauser: any = {};
  public nameUser: any = {};
  private loading: any;
  private productSubscription: Subscription;
  private userListSubscription: Subscription;
  private dataUserListSubscription: Subscription;



  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing,
    private addUserlistService: AddUserlistService,
    private userService: UserService,

  ) {

    this.productId = this.activatedRoute.snapshot.params['id'];

    if (this.productId) this.loadProduct();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
    if (this.userListSubscription) this.userListSubscription.unsubscribe();
    if (this.dataUserListSubscription) this.dataUserListSubscription.unsubscribe();
  }

  loadProduct() {

    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
      console.log(this.product);
    });

    this.userListSubscription = this.addUserlistService.getEventUserList(this.productId).subscribe(data => {
      this.listUsers = data;
      console.log('lista de usuario', this.listUsers);

      this.dataUserListSubscription = this.addUserlistService.getListUserData(this.listUsers[0].userId).subscribe(data => {
        this.dataUserList = data;
        console.log(this.dataUserList);
        this.datauser = this.listUsers[0];

      });
    });


  }

  async addUserList() {
    await this.presentLoading();

    try {

      this.userData.userId = this.authService.getAuth().currentUser.uid;
      this.nameUser = this.userService.getNameUser();
      console.log(this.nameUser);

      await this.addUserlistService.insertNameList(this.userData,this.nameUser ,this.productId);
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


