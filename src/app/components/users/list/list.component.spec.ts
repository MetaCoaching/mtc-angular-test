import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { of } from 'rxjs';

import { UserListComponent } from './list.component';
import { UserService } from '../shared/users.service';
import { User } from '../shared/user.model';

describe('ListComponent', () => {
  let fixture: ComponentFixture<UserListComponent>;
  const user: User = {
    firstName: 'Service',
    lastName: 'Test',
    birthDate: new Date(),
    email: 'johndoemtc@dispostable.com',
    phone: '+15555555555',
  };

  // Mock the service, return the above user instead
  const userService = jasmine.createSpyObj('UserService', ['getUsers']);
  const spy = userService.getUsers.and.returnValue(of([user]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [MatListModule],
      providers: [{ provide: UserService, useValue: userService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
  }));

  // Expect one user in the list, per the stub
  it('should display list', () => {
    fixture.detectChanges();
    expect(spy.calls.any()).toBe(true, 'getUsers called');
    expect(
      fixture.nativeElement.querySelector('mat-list').children.length
    ).toEqual(1);
    const child = fixture.nativeElement.querySelector('mat-list').children[0];
    expect(child.textContent).toContain(user.firstName);
    expect(child.textContent).toContain(user.lastName);
    expect(child.textContent).toContain(user.email);
    expect(child.textContent).toContain(user.phone);
    expect(child.textContent).toContain(user.birthDate.toLocaleDateString());
  });
});
