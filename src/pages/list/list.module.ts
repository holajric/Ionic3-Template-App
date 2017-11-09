import { NgModule } from '@angular/core';

import { IonicPageModule } from 'ionic-angular';

import { SharedModule } from '../../shared/shared.module';
import { ListPage } from './list';

@NgModule({
  imports: [
    SharedModule,
    IonicPageModule.forChild(ListPage)
  ],
  declarations: [
    ListPage
  ],
  entryComponents: [
    ListPage
  ]
})
export class ListPageModule { }
