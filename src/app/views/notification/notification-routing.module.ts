import { NotificationEditComponent } from './notification-edit/notification-edit.component';
import { NotificationDetailComponent } from './notification-detail/notification-detail.component';
import { NotificationAddComponent } from './notification-add/notification-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from './notification.component';



const routes: Routes = [
  { path: '', component: NotificationComponent, data: { title: 'Notification' } },
  { path: 'detail', component: NotificationDetailComponent, data: { title: 'Notification Detail' } },
  { path: 'edit', component: NotificationEditComponent, data: { title: 'Notification Edit' } },
  { path: 'add', component: NotificationAddComponent, data: { title: 'Notification Add' } },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
