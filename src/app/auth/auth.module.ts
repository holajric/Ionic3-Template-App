import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { AuthPage } from './auth';

@NgModule({
  imports: [
    SharedModule,
    IonicPageModule.forChild(AuthPage),
  ],
  declarations: [
    AuthPage,
  ],
  entryComponents: [
    AuthPage
  ]
})
export class AuthPageModule {}