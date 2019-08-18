import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackComponent } from './feedback.component';
import { FeedbackAddComponent } from './feedback-add/feedback-add.component';
import { FeedbackEditComponent } from './feedback-edit/feedback-edit.component';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [FeedbackComponent, FeedbackAddComponent, FeedbackEditComponent, FeedbackDetailComponent],
  imports: [
    CommonModule,
    FeedbackRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
    NgSelectModule
  ]
})
export class FeedbackModule { }
