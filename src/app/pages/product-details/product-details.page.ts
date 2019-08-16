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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
  private userListSubscription: Subscription;
  private nameUserListSubscription: Subscription;

  showDelete = false;
  showAdd = true;


  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing,
    private addUserlistService: AddUserlistService,
    private userService: UserService



  ) {

    this.productId = this.activatedRoute.snapshot.params['id'];

    if (this.productId) this.loadProduct();
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
    if (this.userListSubscription) this.userListSubscription.unsubscribe();
    if (this.nameUserListSubscription) this.nameUserListSubscription.unsubscribe();
  }

  loadProduct() {

    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
      console.log(this.product);
    });

    this.userListSubscription = this.addUserlistService.getEventUserList(this.productId).subscribe(data => {
      this.listUsers = data;
      console.log(this.listUsers);
    });

    this.nameUserListSubscription = this.userService.getNameUser().subscribe(data => {
      this.nameUser = data;
      console.log(this.nameUser);
    });


  }

  async addUserList() {
    await this.presentLoading();
    this.showAdd = false;
    this.showDelete = true;

    try {
      this.userData.userUid = this.authService.getAuth().currentUser.uid;
      this.DadosUser =
        ({
          userUid: this.userData.userUid,
          nameUser: this.nameUser[0].nome
        });

      await this.addUserlistService.insertNameList(this.productId, this.DadosUser);
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


