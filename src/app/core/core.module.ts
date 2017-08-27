import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

// Cordova plugins
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import { AuthService } from './auth.service';
import { DataService } from './data.service';


@NgModule({
  imports: [
    CommonModule, // we use ngFor
  ],
  providers: [ 
    StatusBar,
    SplashScreen,
    Facebook,
    GooglePlus,
    AuthService, 
    DataService 
  ]
})
export class CoreModule { 
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}