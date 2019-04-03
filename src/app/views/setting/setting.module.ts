import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';
import { SettingDetailComponent } from './setting-detail/setting-detail.component';
import { SettingEditComponent } from './setting-edit/setting-edit.component';

import { JwtInterceptor, ErrorInterceptor } from '../../_helpers';


@NgModule({
  declarations: [SettingComponent, SettingDetailComponent, SettingEditComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    TabsModule,
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule
  ],
})
export class SettingModule { }
