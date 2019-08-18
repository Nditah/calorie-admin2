import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes } from '@angular/router';

const routes: Routes = [
  { path: '',               component: UserComponent,           data: { title: 'Nutrient' } },
  { path: 'detail/:id',     component: UserDetailComponent,     data: { title: 'Nutrient Detail' } },
  { path: 'edit/:id',       component: UserEditComponent,       data: { title: 'Nutrient Edit' } },
  { path: 'add',            component: UserAddComponent,        data: { title: 'Nutrient Add' } },
];

@NgModule({
  declarations: [UserComponent, UserAddComponent, UserEditComponent, UserDetailComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
    NgSelectModule
  ]
})
export class UserModule { }
