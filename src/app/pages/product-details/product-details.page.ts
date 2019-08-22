import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.productSubscription) this.productSubscription.unsubscribe();
    if (this.userListSubscription) this.userListSubscription.unsubscribe();
    if (this.nameUserListSubscription) this.nameUserListSubscription.unsubscribe();
  }

  async loadProduct() {
    //traz todos os products / eventos
    this.productSubscription = this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;

    });
    //traz a array de usuarios 
    this.userListSubscription = this.addUserlistService.getEventUserList(this.productId).subscribe(data => {
      this.listUsers = data;

      // valida se o usuario esta na lista e verifica e habilita o botão de cancelar presença
      let array = this.listUsers;
      let user = this.authService.getAuth().currentUser.uid;

      for (let i = 0; i < array.length; i++) {
        if (array.userUid = user) {
          this.showDelete = true;
          this.showAdd = false;
        }
        else {

          this.showAdd = true;
        }
      }


    });

    // traz os dados do usuario
    this.nameUserListSubscription = this.userService.getNameUser().subscribe(data => {
      this.nameUser = data;


    });
  }

  //adiciona o nome do usuario na lista 
  async addUserList() {
    await this.presentLoading();



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


