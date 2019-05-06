import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImageAddComponent } from './image-add/image-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageComponent } from './image.component';



const routes: Routes = [
  { path: '', component: ImageComponent, data: { title: 'Image' } },
  { path: 'detail/:id', component: ImageDetailComponent, data: { title: 'Image Detail' } },
  { path: 'add', component: ImageAddComponent, data: { title: 'Image Add' } },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageRoutingModule { }
