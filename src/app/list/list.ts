import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/map';

import { DataService } from '../core/data.service';
import { AuthService } from '../core/auth.service';
import { UserModel } from '../core/user.model'
import { Config } from '../env.constants'

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  public tasks: FirebaseListObservable<any[]>;
  public userProfile: UserModel;
  public uid: string = "";

  constructor(
    public navCtrl: NavController, 
    public db: DataService,
    public authService: AuthService,
    private alertCtrl: AlertController
  ) {
    
  }

  ionViewDidLoad() {
    this.authService.getFullProfile().subscribe((user) => {
      this.userProfile = user;
      this.uid = user.uid;
    });
    this.tasks = this.db.listAll(Config.firebase_tables.Tasks, {
      orderByChild: "deadline"
    }).map(
      tasks => tasks.filter(
        task => task.user == this.uid
      )
    ) as FirebaseListObservable<any[]>;
  }

  addTask() {
    let alert = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'deadline',
          placeholder: 'Deadline',
          type: 'date'
        },
        {
          name: 'priority',
          placeholder: 'Priority',
          type: 'number'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {}
        },
        {
          text: 'Save',
          handler: data => {
            this.db.add(Config.firebase_tables.Tasks, {
              title: data.title,
              user: this.userProfile.uid,
              deadline: data.deadline,
              priority: data.priority,
              done: false
            })
          }
        }
      ]
    });
    alert.present();
  }

  delete(id) {
    this.db.delete(Config.firebase_tables.Tasks, id);
  }

  deleteAll() {
    this.db.deleteAll(Config.firebase_tables.Tasks);
  }

  markDone(id) {
    this.db.update(Config.firebase_tables.Tasks, id, { done: true });
  }

  markUndone(id) {
    this.db.update(Config.firebase_tables.Tasks, id, { done: false });    
  }

  logout() {
    this.authService.signOut().then(() => this.navCtrl.setRoot('AuthPage'));
  }

}
