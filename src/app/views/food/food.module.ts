import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { FoodRoutingModule } from './food-routing.module';
import { FoodComponent } from './food.component';
import { FoodAddComponent } from './food-add/food-add.component';
import { FoodEditComponent } from './food-edit/food-edit.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';

@NgModule({
  declarations: [FoodComponent, FoodAddComponent, FoodEditComponent, FoodDetailComponent],
  imports: [
    CommonModule,
    FoodRoutingModule,
    TabsModule,
    TooltipModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule
  ]
})
export class FoodModule { }
