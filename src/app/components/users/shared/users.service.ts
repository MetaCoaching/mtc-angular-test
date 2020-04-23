import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  postUser(user: User): Promise<DocumentReference> {
    return this.firestore.collection('users').add(user);
  }

  getUsers(): Observable<User[]> {
    return this.firestore
      .collection<User>('users')
      .valueChanges()
      .pipe(
        map((users) => {
          users.forEach((user: User) => {
            // Firestore stores a timestamp format that should be converted to a Date
            user.birthDate = user.birthTimeStamp.toDate();
          });
          return users;
        })
      );
  }
}
