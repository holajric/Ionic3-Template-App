import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { HomePage } from './home';

@NgModule({
  imports: [
    SharedModule,
    IonicPageModule.forChild(HomePage)
  ],
  declarations: [
    HomePage
  ],
  entryComponents: [
    HomePage
  ]
})
export class HomePageModule { }
