import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import {SettingDetailComponent} from './setting-detail/setting-detail.component';
import {SettingEditComponent} from './setting-edit/setting-edit.component';
import { SettingAddComponent } from './setting-add/setting-add.component';

const routes: Routes = [
  { path: '', component: SettingComponent, data: { title: 'Setting' } },
  { path: 'add', component: SettingAddComponent, data: {title: 'Setting Add'} },
  { path: 'detail/:id', component: SettingDetailComponent, data: {title: 'Setting Detail'} },
  { path: 'edit/:id', component: SettingEditComponent, data: {title: 'Setting Edit'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
