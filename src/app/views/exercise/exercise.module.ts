import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseComponent } from './exercise.component';
import { ExerciseAddComponent} from './exercise-add/exercise-add.component';
import { ExerciseEditComponent } from './exercise-edit/exercise-edit.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';


@NgModule({
  declarations: [ ExerciseComponent,
    ExerciseAddComponent,
    ExerciseEditComponent,
    ExerciseDetailComponent],

  imports: [
    CommonModule,
    ExerciseRoutingModule,
    TabsModule,
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule

  ]
})
export class ExerciseModule { }
