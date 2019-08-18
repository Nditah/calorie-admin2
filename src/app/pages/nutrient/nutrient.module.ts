import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

import { NutrientRoutingModule } from './nutrient-routing.module';
import { NutrientComponent } from './nutrient.component';
import { NutrientAddComponent} from './nutrient-add/nutrient-add.component';
import { NutrientEditComponent } from './nutrient-edit/nutrient-edit.component';
import { NutrientDetailComponent } from './nutrient-detail/nutrient-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ NutrientComponent,
    NutrientAddComponent,
    NutrientEditComponent,
    NutrientDetailComponent],

  imports: [
    CommonModule,
    NutrientRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
    NgSelectModule

  ]
})
export class NutrientModule { }
