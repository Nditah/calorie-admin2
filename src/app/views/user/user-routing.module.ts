import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserAddComponent } from './user-add/user-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';



const routes: Routes = [
  { path: '', component: UserComponent, data: { title: 'User' } },
  { path: 'detail', component: UserDetailComponent, data: { title: 'User Detail' } },
  { path: 'edit', component: UserEditComponent, data: { title: 'User Edit' } },
  { path: 'add', component: UserAddComponent, data: { title: 'User Add' } },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
