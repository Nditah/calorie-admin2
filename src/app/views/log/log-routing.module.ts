import { LogEditComponent } from './log-edit/log-edit.component';
import { LogDetailComponent } from './log-detail/log-detail.component';
import { LogAddComponent } from './log-add/log-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogComponent } from './log.component';



const routes: Routes = [
  { path: '', component: LogComponent, data: { title: 'Log' } },
  { path: 'detail', component: LogDetailComponent, data: { title: 'Log Detail' } },
  { path: 'edit', component: LogEditComponent, data: { title: 'Log Edit' } },
  { path: 'add', component: LogAddComponent, data: { title: 'Log Add' } },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogRoutingModule { }
