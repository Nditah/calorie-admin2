import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseComponent } from './exercise.component';
import { ExerciseAddComponent} from './exercise-add/exercise-add.component';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { ComponentsModule } from '../../components/components.module';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '',               component: ExerciseComponent,           data: { title: 'Nutrient' } },
  { path: 'detail/:id',     component: ExerciseDetailComponent,     data: { title: 'Nutrient Detail' } },
  { path: 'edit/:id',       component: ExerciseEditComponent,       data: { title: 'Nutrient Edit' } },
  { path: 'add',            component: ExerciseAddComponent,        data: { title: 'Nutrient Add' } },
];


@NgModule({
  declarations: [ ExerciseComponent,
    ExerciseAddComponent,
    ExerciseEditComponent,
    ExerciseDetailComponent
  ],
  imports: [
    CommonModule,
    ExerciseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
    NgSelectModule,
    ComponentsModule,
    [RouterModule.forChild(routes)]
  ],
  exports: [
    RouterModule
  ]
})
export class ExerciseModule { }
