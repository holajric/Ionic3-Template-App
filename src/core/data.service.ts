import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as _ from 'lodash';
import * as firebase from 'firebase';
declare type QueryFn = (ref: firebase.firestore.CollectionReference) => firebase.firestore.Query;
declare type HookFn = (context, variable: string) => void;
import { FirebaseModel } from '../models/firebase.model';

@Injectable()
export class DataService {
    constructor(private afs: AngularFirestore) {}

    public coll<T>(path: string, query: QueryFn = ref => ref) {
        return this.afs.collection<T>(path, query)
    }

    public doc<T>(path: string) {
        return this.afs.doc<T>(path);
    }

    public coll$<T>(path: string, query: QueryFn = ref => ref) {
        return this.afs.collection<T>(path, query).snapshotChanges();
    }

    public doc$<T>(path: string) {
        return this.afs.doc<T>(path).snapshotChanges();
    }

    public bindCollection<T extends object>(path: string, context, variable: string, query : QueryFn = ref => ref, hook: HookFn = (context, variable) => {}) {
        this.afs.collection<T>(path, query).snapshotChanges().subscribe(actions => {
            context[variable] = [];
            console.log(actions);
            actions.map(a => {
                const data = a.payload.doc.data() as T;
                const id = a.payload.doc.id;
                context[variable].push({ id, ...(data as object) });
            });
            hook(context, variable);
        });
    }

    public bind<T extends FirebaseModel>(path: string, context, variable: string, hook: HookFn = (context, variable) => {}) {
        this.afs.doc<T>(path).snapshotChanges().subscribe(action => {
            const data = action.payload.data() as T;
            const id = action.payload.id;
            context[variable] = { id, ...(data as object) };
            hook(context, variable);
        })
    }

    public add<T extends FirebaseModel>(path: string, document: T) {
        return this.afs.collection<FirebaseModel>(path).add({
            updatedAt: firebase.firestore.FieldValue.serverTimestamp() as number,
            createdAt: firebase.firestore.FieldValue.serverTimestamp() as number,
            ...(document as object)
        });
    }

    public set<T extends FirebaseModel>(path: string, document: T) {
        return this.afs.doc<FirebaseModel>(path).set({
            updatedAt: firebase.firestore.FieldValue.serverTimestamp() as number,
            createdAt: firebase.firestore.FieldValue.serverTimestamp() as number,
            ...(document as object)
        });
    }

    public update<T extends FirebaseModel>(path: string, document: T) {
        return this.afs.doc<T>(path).update({
            updatedAt: firebase.firestore.FieldValue.serverTimestamp() as number,
            ...(document as object)
        });
    }

    public upsert<T extends FirebaseModel>(path: string, document: T) {
        const doc = this.afs.doc<FirebaseModel>(path).snapshotChanges().take(1).toPromise()
        return doc.then(snap => {
            return snap.payload.exists ? this.update(path, document) : this.set(path, document)
        })
    }
}