import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { map } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { Observable, forkJoin } from 'rxjs';

import { Person } from 'src/app/@core/models/person.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  create(person: Person) {
    return this.db.list('person').push(person);
  }

  update(person: Person, key: string) {
    return this.db.list('person').update(key, person);
  }

  delete(key: string) {
    this.db.list(`person/${key}`).remove();
  }

  getAll(): Observable<any> {
    return this.db.list('person')
      .snapshotChanges()
      .pipe(
        map(changes => changes.map(change => ({
          key: change.payload.key,
          ...change.payload.val() as Person,
        })))
      );
  }
}

