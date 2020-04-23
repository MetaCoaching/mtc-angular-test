import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

import { UserRegisterComponent } from './register.component';
import { User } from '../shared/user.model';
import { UserService } from '../shared/users.service';

describe('UserRegisterComponent', () => {
  let component: UserRegisterComponent;
  let fixture: ComponentFixture<UserRegisterComponent>;

  // Mock the service, don't return anything
  const userService = jasmine.createSpyObj('UserService', ['postUser']);
  const spy = userService.postUser;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserRegisterComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: UserService, useValue: userService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form', () => {
    expect(component.formGroup instanceof FormGroup).toBeTrue();
  });

  it('should get error messages', () => {
    expect(component.getErrorMessage('date')).toEqual('Invalid Birth Date');
    expect(component.getErrorMessage('format')).toEqual('Invalid Format');
    expect(component.getErrorMessage('required')).toEqual('Required');
  });

  it('should submit the form', () => {
    const user: User = {
      firstName: 'Service',
      lastName: 'Test',
      birthDate: new Date(),
      email: 'johndoemtc@dispostable.com',
      phone: '+15555555555',
    };

    // Fill in the form programmatically and submit
    const formGroup = component.formGroup;
    formGroup.get('firstName').setValue(user.firstName);
    formGroup.get('lastName').setValue(user.lastName);
    formGroup.get('birthDate').setValue(user.birthDate);
    formGroup.get('email').setValue(user.email);
    formGroup.get('phone').setValue(user.phone);

    component.onSubmit(component.formGroup);

    expect(spy).toHaveBeenCalledWith(user);
  });
});
