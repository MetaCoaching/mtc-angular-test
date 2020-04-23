import { TestBed, fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';

import { UserService } from './users.service';
import { User } from './user.model';
import { doesNotReject } from 'assert';

describe('UserService', () => {
  let service: UserService;
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    birthTimeStamp: firebase.firestore.Timestamp.fromDate(new Date()),
    email: 'johndoemtc2@dispostable.com',
    phone: '+15555555555',
  };

  beforeEach(() => {
    // Stub the firestore to mock any response
    const FirestoreStub = {
      collection: (name: string) => ({
        add: (newUser: User) => {
          return Promise.resolve(newUser);
        },
        valueChanges: () => new BehaviorSubject([user]),
      }),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: FirestoreStub }],
    });
    service = TestBed.inject(UserService);
  });

  it('should get users', () => {
    service.getUsers().subscribe((users) => {
      expect(users.length).toEqual(1);
      expect(users[0].birthDate).toEqual(user.birthTimeStamp.toDate());
    });
  });

  it('should add user', fakeAsync(() => {
    const createdUser = {
      firstName: 'John',
      lastName: 'Doe',
      birthDate: new Date(),
      email: 'johndoemtc2@dispostable.com',
      phone: '+15555555555',
    };
    let resultingUser: User;
    service.postUser(createdUser).then((result) => {
      resultingUser = (result as unknown) as User; // Cast the DocumentReference to a User
    });

    // Flush Microtrasks allows the test to fake asynchronous behavior,
    // assigning result to the resultingUser before the expectations.
    flushMicrotasks();
    expect(resultingUser).toEqual(createdUser);
  }));
});
