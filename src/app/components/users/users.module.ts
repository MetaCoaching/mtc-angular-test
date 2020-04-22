import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { UserListComponent } from './list/list.component';

@NgModule({
  declarations: [UserListComponent],
  imports: [CommonModule, MatListModule, MatIconModule],
})
export class UsersModule {}
