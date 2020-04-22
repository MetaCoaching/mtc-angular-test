import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../shared/user.model';
import { UserService } from '../shared/users.service';

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;

  ngOnInit(): void {}

  constructor(userService: UserService) {
    this.users = userService.getUsers();
  }
}
