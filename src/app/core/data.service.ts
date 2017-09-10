import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DataService {

  constructor(public db: AngularFireDatabase) {
  }

  listAll(table: string, query?: any) {
    return this.db.list(table, { query: query });
  }

  get(table: string, id: string) {
    return this.db.object(table + '/' + id);
  }

  add(table: string, data: any) {
    return this.db.list(table).push(data);
  }

  delete(table: string, id: string) {
    return this.db.list(table).remove(id);
  }

  deleteAll(table) {
    return this.db.list(table).remove();
  }

  update(table: string, id: string, changes: any) {
    return this.db.list(table).update(id, changes);
  }
}
