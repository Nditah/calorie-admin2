import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { FeedbackAddComponent } from './feedback-add/feedback-add.component';
import { FeedbackEditComponent } from './feedback-edit/feedback-edit.component';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';

@NgModule({
  declarations: [FeedbackComponent, FeedbackAddComponent, FeedbackEditComponent, FeedbackDetailComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    TabsModule,
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule
  ]
})
export class FeedbackModule { }
