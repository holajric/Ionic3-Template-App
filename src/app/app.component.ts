import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core'

import { AuthService } from '../core/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  rootPage:any;

  @ViewChild(Nav) nav: Nav;

  constructor(
    private translate: TranslateService, 
    private platform: Platform, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen,
    private authService: AuthService,
    private loading: LoadingController
  ) {
    this.initTranslate();
  }

  ngOnInit() {  
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    let loading = this.loading.create();
    this.authService.getAuth()
      .map(state => !!state)
      .subscribe(authenticated => {
        loading.dismiss();
        this.rootPage = (authenticated) ? 'ListPage' : 'AuthPage';
      }, (error) => {
        loading.dismiss();
        this.rootPage = 'AuthPage';
        console.log('Error: ' + JSON.stringify(error));
      });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }
  }
}

