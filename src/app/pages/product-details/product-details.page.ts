import { Component, OnInit, ɵConsole } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Cities } from 'src/app/interfaces/cities';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';





@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  private productId: string = null;
  public product: Product = {};
  public cities = new Array<Cities>();
  private loading: any;
  private productSubscription: Subscription;
  private city: any;


  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private socialSharing: SocialSharing
  ) {

    this.productId = this.activatedRoute.snapshot.params['id'];



    // this.city = this.citiesService.getCities().subscribe(cidades => {
    //this.cities = cidades
    //});

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

  shared() {

   
    // Share via email
    this.socialSharing.shareViaWhatsApp('Message via WhatsApp', null /* img */, null /* url */).then(() => {
      console.log('funciona');
    }).catch(() => {
      console.log('deu erro');
    });

  }


}
