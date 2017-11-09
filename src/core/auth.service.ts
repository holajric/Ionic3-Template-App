import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Observable } from 'rxjs/Rx';

import { AngularFireAuth } from 'angularfire2/auth';
//import * as firebase from 'firebase/app';
import * as firebase from 'firebase';
import * as _ from 'lodash';

import { Config } from '../enviroment/env.constants';
import { UserModel } from '../models/user.model';
import { DataService } from './data.service';

@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private db: DataService,
    public facebook: Facebook,
    public googleplus: GooglePlus,
    public platform: Platform
  ) {}

  /**
   * get auth state
   */
  get currentUser(): any {
    return this.getAuth().first();
  }

  /**
   * get auth
   */
  getAuth(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  /**
   * sign in with facebook
   */
  signInWithFacebook(): Promise<any> {
    if (this.platform.is('cordova')) {
      return this.platform.ready().then(() => {
        return this.facebook.login(['email', 'public_profile']).then((res) => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
          return this.afAuth.auth.signInWithCredential(facebookCredential);
        });
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
  }

  /**
   * sign in with googleplus
   */
  signInWithGoogle(): Promise<any> {
    if (this.platform.is('cordova')) {
      return this.platform.ready().then(() => {
        return this.googleplus.login({
          'scopes': 'email',
          'webClientId' : Config.google_web_client_id,
          'offline': true
        }).then((res) => {
          const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
          return this.afAuth.auth.signInWithCredential(googleCredential);
        }, (error) => {
          return Promise.reject(error);
        });
      });
    } else {
      return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  /**
   * sign in with email & password
   */
  signInWithEmail(credential: any): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(credential.email, credential.password);
  }

  /**
   * sign up with email & password
   */
  signUpWithEmail(credential: any): Promise<void> {
    return this.afAuth.auth.createUserWithEmailAndPassword(credential.email, credential.password);
  }

  /**
   * sign out
   */
  signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  updateProfile(user: UserModel): Promise<any> {
    user.updatedAt = firebase.firestore.FieldValue.serverTimestamp() as number;

    let providerData = user.providerData;
    if (providerData && providerData.photoURL)
      user.photoURL = providerData.photoURL;
    else if (providerData && providerData.providerId === 'facebook.com')
      user.photoURL = `https://graph.facebook.com/${providerData.uid}/picture?type=square`;
    user.providerData = _.toPlainObject(_.cloneDeep(providerData));
    return this.db.upsert<UserModel>('users/' + user.uid, user);
  }

  /**
   * get full profile
   */
  getFullProfile(uid?: string): Observable<UserModel> {
    if (uid)
      return this.db.doc$<UserModel>('users/' + uid);
    
    return Observable.create((observer) => {
      this.getAuth().subscribe((user: firebase.User) => {
        if (user !== null)
          this.db.doc$<UserModel>('users/' + user.uid).subscribe((res) => observer.next(res));
      });
    });
  }
}

