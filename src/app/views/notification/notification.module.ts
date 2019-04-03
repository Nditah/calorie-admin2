import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { NotificationAddComponent } from './notification-add/notification-add.component';
import { NotificationEditComponent } from './notification-edit/notification-edit.component';
import { NotificationDetailComponent } from './notification-detail/notification-detail.component';

@NgModule({
  declarations: [NotificationComponent, NotificationAddComponent, NotificationEditComponent, NotificationDetailComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    TabsModule,
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule
  ]
})
export class NotificationModule { }
