import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NutrientComponent } from './nutrient.component';
import { NutrientAddComponent } from './nutrient-add/nutrient-add.component';
import { NutrientEditComponent } from './nutrient-edit/nutrient-edit.component';
import { NutrientDetailComponent } from './nutrient-detail/nutrient-detail.component';


const routes: Routes = [
  { path: '', component: NutrientComponent, data: { title: 'Nutrient' } },
  { path: 'detail', component: NutrientDetailComponent, data: { title: 'Nutrient Detail' } },
  { path: 'edit', component: NutrientEditComponent, data: { title: 'Nutrient Edit' } },
  { path: 'add', component: NutrientAddComponent, data: { title: 'Nutrient Add' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NutrientRoutingModule { }
