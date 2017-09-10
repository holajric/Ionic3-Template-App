import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AuthService } from '../core/auth.service';

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {

  public authAction: string = "login";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public loadingCtrl: LoadingController, 
    public toastCtrl: ToastController,
    public authService: AuthService
  ) {
  }

  loginWithFacebook() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.authService.signInWithFacebook()
      .then((res) => {
        this.updateProfile(res.user || res);
        loading.dismiss();
        this.navCtrl.setRoot('ListPage');
      }, (error) => {
        loading.dismiss();
        this.showMessage(error && error.message);
      });
  }

  /**
   * login with google
   */
  loginWithGoogle() {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.authService.signInWithGoogle()
      .then((res) => {
        this.updateProfile(res.user || res);
        loading.dismiss();
        this.navCtrl.setRoot('ListPage');
      }, (error) => {
        loading.dismiss();
        this.showMessage(error && error.message);
      });
  }

  authWithEmail(email:string, password: string) {
    let loading = this.loadingCtrl.create();
    console.log(email, password);
    loading.present();
    let authPromise = (this.authAction == "login") ? 
      this.authService.signInWithEmail({email: email, password: password}) : 
      this.authService.signUpWithEmail({email: email, password: password});
    authPromise
      .then((res) => {
        this.updateProfile(res.user || res);
        loading.dismiss();
        this.navCtrl.setRoot('ListPage');
      }, (error) => {
        loading.dismiss();
        this.showMessage(error && error.message);
      });
  }

  private updateProfile(user: any) {
    return this.authService.updateProfile({
      uid        : user.uid,
      displayName: user.displayName,
      email      : user.email,
      photoURL   : user.photoURL,
      providerData   : user.providerData[0]
    });
  }

  private showMessage(message: string) {
    this.toastCtrl.create({message: message, duration: 3000}).present();
  }

}
