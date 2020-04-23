import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormGroupDirective,
} from '@angular/forms';

import { UserService } from '../shared/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  formGroup: FormGroup;
  minBirthDate = new Date('1900-01-01');
  maxBirthDate = new Date();
  @ViewChild(FormGroupDirective) formRef: FormGroupDirective;

  constructor(private formBuilder: FormBuilder, private service: UserService) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      birthDate: [''],
      email: ['', Validators.email],
      firstName: [''],
      lastName: [''],
      phone: ['', Validators.pattern('[0-9]*')],
    });
  }

  getErrorMessage(type: string) {
    let message: string;

    switch (type) {
      case 'date':
        message = 'Invalid Birth Date';
        break;
      case 'format':
        message = 'Invalid Format';
        break;
      default:
        message = 'Required';
    }
    return message;
  }

  onSubmit(formGroup: FormGroup) {
    this.service.postUser(formGroup.value);
    this.formRef.resetForm();
    formGroup.reset();
  }
}
