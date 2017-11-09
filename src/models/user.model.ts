import { FirebaseModel } from './firebase.model';

export class UserModel extends FirebaseModel {
  uid?: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
  providerData?: any;
}