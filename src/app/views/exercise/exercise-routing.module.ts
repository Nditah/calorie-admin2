import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExerciseComponent } from './exercise.component';
import { ExerciseAddComponent } from './exercise-add/exercise-add.component';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';


const routes: Routes = [
  { path: '', component: ExerciseComponent, data: { title: 'Exercise' } },
  { path: 'detail', component: ExerciseDetailComponent, data: { title: 'Exercise Detail' } },
  { path: 'edit', component: ExerciseEditComponent, data: { title: 'Exercise Edit' } },
  { path: 'add', component: ExerciseAddComponent, data: { title: 'Exercise Add' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }
