import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';



const routes: Routes = [
  { path: '', component: ProfileComponent, data: { title: 'Personal Profile' } },
  { path: 'edit/:id', component: ProfileEditComponent, data: { title: 'Profile Edit' } },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
