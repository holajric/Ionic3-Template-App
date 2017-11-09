import { FirebaseModel } from './firebase.model';

export class TaskModel extends FirebaseModel {
  title: string;
  user: string;
  deadline?: Date;
  priority?: number;
  done: boolean;
}