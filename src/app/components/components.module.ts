import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from 'node_modules/@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReceiptsComponent } from './receipts/receipts.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { AdvanceTableComponent } from './advance-table/advance-table.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
// import { CustomFormsFieldModule } from './appanalyst/custom-forms-field/custom-forms-field.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ReceiptsComponent,
    InvoiceComponent,
    RightSidebarComponent,
    AdvanceTableComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ReceiptsComponent,
    InvoiceComponent,
    RightSidebarComponent,
    AdvanceTableComponent
  ]
})
export class ComponentsModule { }
