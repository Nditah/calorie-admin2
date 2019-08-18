import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

import { ImageRoutingModule } from './image-routing.module';
import { ImageComponent } from './image.component';
import { ImageAddComponent } from './image-add/image-add.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ImageComponent, ImageAddComponent, ImageDetailComponent],
  imports: [
    CommonModule,
    ImageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgbModule,
    NgSelectModule
  ]
})
export class ImageModule { }
