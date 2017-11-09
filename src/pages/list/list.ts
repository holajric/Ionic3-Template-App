import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { DataService } from '../../core/data.service';
import { AuthService } from '../../core/auth.service';
import { UserModel } from '../../models/user.model';
import { TaskModel } from '../../models/task.model';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  public userProfile: UserModel;
  public uid: string = "";
  public content: string = "sem pište text";
  public tasks: TaskModel[];

  constructor(
    public navCtrl: NavController, 
    public authService: AuthService,
    public afs: AngularFirestore,
    public db: DataService
  ) {
    this.db.bindCollection<TaskModel>("tasks", this, "tasks");
  }

  ionViewDidLoad() {
    this.authService.getFullProfile().subscribe((user: UserModel) => {
      this.userProfile = user;
      if(user)
        this.uid = user.uid;
    });
  }

  logout() {
    this.authService.signOut().then(() => this.navCtrl.setRoot('AuthPage'));
  }

  addTask(text) {
    this.db.add<TaskModel>("tasks",{title: text, user: this.uid, done: false});
  }

  /*delete(index) {
    this.tasks.splice(index, 1)
  }*/

}
