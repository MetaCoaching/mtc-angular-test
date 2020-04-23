import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';

import { UserService } from './users.service';

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
});
