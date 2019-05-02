import { FeedbackEditComponent } from './feedback-edit/feedback-edit.component';
import { FeedbackDetailComponent } from './feedback-detail/feedback-detail.component';
import { FeedbackAddComponent } from './feedback-add/feedback-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackComponent } from './feedback.component';



const routes: Routes = [
  { path: '', component: FeedbackComponent, data: { title: 'Feedback' } },
  { path: 'detail/:id', component: FeedbackDetailComponent, data: { title: 'Feedback Detail' } },
  { path: 'edit/:id', component: FeedbackEditComponent, data: { title: 'Feedback Edit' } },
  { path: 'add', component: FeedbackAddComponent, data: { title: 'Feedback Add' } },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
