import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public wavesPosition: number = 0;
  private wavesDifference: number = 100;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;
  

  constructor(
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    public keyboard: Keyboard,
    private userService: UserService

  ) { }

  ngOnInit() { }

  //controle do segment da tela de login

  segmentChanged(event: any) {
    console.log(event);
    if (event.detail.value === "login") {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
      
     
    } catch (error) {

      let message: string;

      switch (error.code) {
        case 'auth/user-not-found':
          message = 'Usuário não encontrado!!';
          break;

        case 'auth/wrong-password':
          message = 'Senha inválida!!';
          break;
      }

      console.error(error);
      this.presentToast(message);

    } finally {
      this.loading.dismiss();
    
    }

  }


  async register() {
    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister);
      
      this.userRegister.userUid = this.authService.getAuth().currentUser.uid;
      this.userService.addUser(this.userRegister);
      
      
    } catch (error) {

      let message: string;

      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'E-mail já utilizado!!';
          break;

        case 'auth/invalid-email':
          message = 'E-mail inválido!!';
          break;

          case 'auth/weak-password':
            message = 'A senha deve ter pelo menos 6 caracteres!!'
            break;
      }

      console.error(error);
      this.presentToast(message);

    } finally {
      this.loading.dismiss();
      
    }

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...',
    });

    return this.loading.present();

  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
