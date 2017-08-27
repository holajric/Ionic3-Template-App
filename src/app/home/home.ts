import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { DataService } from '../core/data.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, db: DataService) {
    this.items = db.listAll("data");
  }

}
