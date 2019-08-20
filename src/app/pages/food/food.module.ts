import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

import { FoodRoutingModule } from './food-routing.module';
import { FoodComponent } from './food.component';
import { FoodAddComponent } from './food-add/food-add.component';
import { FoodEditComponent } from './food-edit/food-edit.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from '../../components/components.module';
import { CustomFormsFieldModule } from 'src/app/components/appanalyst/custom-forms-field/custom-forms-field.module';

@NgModule({
  declarations: [FoodComponent, FoodAddComponent, FoodEditComponent, FoodDetailComponent],
  imports: [
    CommonModule,
    FoodRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsFieldModule,
    DataTablesModule,
    NgbModule,
    NgSelectModule,
    ComponentsModule,
  ]
})
export class FoodModule { }
