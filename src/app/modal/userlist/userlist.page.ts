import { Component, OnInit, Input } from '@angular/core';
import { ModalController, LoadingController, NavParams } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Cities } from 'src/app/interfaces/cities';
import { AddUserlistService } from 'src/app/services/add-userlist.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.page.html',
  styleUrls: ['./userlist.page.scss'],
})
export class UserlistPage implements OnInit {
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
  
  // Data passed in by componentProps
  @Input() RecepProduct: string;

  showDelete = false;
  showAdd = true;


  constructor(private modalCtrl: ModalController,
    private productService: ProductService,
    private addUserlistService: AddUserlistService,
    private authService: AuthService,
    private userService: UserService,
    private loadingCtrl: LoadingController,
    navParams: NavParams ){
    
      {
        this.productId = navParams.get('RecepProduct');
        if (this.productId) this.loadProduct();
      
      }
      
  }

  ngOnInit() {
  }

  closeModal() {
    this.modalCtrl.dismiss();
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
      console.log(this.listUsers);

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

        console.log(this.productId,this.DadosUser);

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


  async deleteUserList() {
    await this.presentLoading();
   
  }

}
