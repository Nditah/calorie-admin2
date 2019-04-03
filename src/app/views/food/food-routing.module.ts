import { FoodEditComponent } from './food-edit/food-edit.component';
import { FoodDetailComponent } from './food-detail/food-detail.component';
import { FoodAddComponent } from './food-add/food-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodComponent } from './food.component';


const routes: Routes = [
  { path: '', component: FoodComponent, data: { title: 'Food' } },
  { path: 'detail', component: FoodDetailComponent, data: { title: 'Food Detail' } },
  { path: 'edit', component: FoodEditComponent, data: { title: 'Food Edit' } },
  { path: 'add', component: FoodAddComponent, data: { title: 'Food Add' } },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoodRoutingModule { }
