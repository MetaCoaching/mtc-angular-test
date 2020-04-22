import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';

import { UserService } from './users.service';

describe('UsersService', () => {
  let service: UserService;

  beforeEach(() => {
    // Stub the firestore to mock any response
    const FirestoreStub = {
      collection: (name: string) => ({
        doc: (id: string) => ({}),
      }),
    };
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: FirestoreStub }],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
