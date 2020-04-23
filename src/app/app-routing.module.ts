import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './components/users/list/list.component';
import { UserRegisterComponent } from './components/users/register/register.component';

const routes: Routes = [
  { component: UserListComponent, path: 'list' },
  { component: UserRegisterComponent, path: 'register' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
