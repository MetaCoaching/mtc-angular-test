import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { UserListComponent } from './list.component';

describe('ListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    birthTimeStamp: firebase.firestore.Timestamp.fromDate(new Date()),
    email: 'johndoemtc@dispostable.com',
    phone: '+15555555555',
  };

  // Create a stub which replaces the call to the real Firebase
  const FirestoreStub = {
    collection: (name: string) => ({
      valueChanges: () => new BehaviorSubject([user]),
    }),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [{ provide: AngularFirestore, useValue: FirestoreStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    fixture.detectChanges();
  });

  // Expect one user in the list, per the stub
  it('should display list', () => {
    expect(
      fixture.nativeElement.querySelector('mat-list').children.length
    ).toEqual(1);
    const child = fixture.nativeElement.querySelector('mat-list').children[0];
    expect(child.textContent).toContain(user.firstName);
    expect(child.textContent).toContain(user.lastName);
    expect(child.textContent).toContain(user.email);
    expect(child.textContent).toContain(user.phone);
    expect(child.textContent).toContain(
      user.birthTimeStamp.toDate().toLocaleDateString()
    );
  });
});
