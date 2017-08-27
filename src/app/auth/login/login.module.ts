import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../../shared/shared.module';
import { LoginPage } from './login';

@NgModule({
  imports: [
    SharedModule,
    IonicPageModule.forChild(LoginPage),
  ],
  declarations: [
    LoginPage,
  ],
  entryComponents: [
    LoginPage
  ]
})
export class LoginPageModule {}