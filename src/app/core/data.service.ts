import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { Config } from '../env.constants';

@Injectable()
export class DataService {

  constructor(public db: AngularFireDatabase) {
  }

  listAll(table: string = 'data') {
    return this.db.list(`${Config.firebase_tables[table]}`);
  }
}
