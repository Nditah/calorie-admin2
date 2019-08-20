import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { SettingDetailComponent } from './setting-detail/setting-detail.component';
import { SettingEditComponent } from './setting-edit/setting-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SettingAddComponent } from './setting-add/setting-add.component';


@NgModule({
  declarations: [SettingComponent, SettingDetailComponent, SettingEditComponent, SettingAddComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
    NgSelectModule
  ],
})
export class SettingModule { }
