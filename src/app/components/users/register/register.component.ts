import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../shared/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  formGroup: FormGroup;

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

  getRequiredErrorMessage() {
    return 'Required';
  }

  getFormatErrorMessage() {
    return 'Invalid Format';
  }

  onSubmit(formGroup: FormGroup) {
    this.service.postUser(formGroup.value);
  }
}
