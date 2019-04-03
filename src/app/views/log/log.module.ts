import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { LogRoutingModule } from './log-routing.module';
import { LogComponent } from './log.component';
import { LogAddComponent } from './log-add/log-add.component';
import { LogEditComponent } from './log-edit/log-edit.component';
import { LogDetailComponent } from './log-detail/log-detail.component';

@NgModule({
  declarations: [LogComponent, LogAddComponent, LogEditComponent, LogDetailComponent],
  imports: [
    CommonModule,
    LogRoutingModule,
    TabsModule,
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule
  ]
})
export class LogModule { }
