import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DataTableModule,SharedModule} from 'primeng/primeng';

import { DocumentRoutes } from './document.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {ListOfDocumentComponent } from './list-of-document/list-of-document.component';
import { MetaDocumentComponent } from './meta-document/meta-document.component';
import { CountryOfDocumentComponent } from './country-of-document/country-of-document.component';
@NgModule({
  imports: [
    CommonModule, 
    RouterModule.forChild( DocumentRoutes),
    DataTableModule, 
    SharedModule,
  NgbModule,
    FormsModule,
    ReactiveFormsModule,],
    declarations: [ListOfDocumentComponent,  MetaDocumentComponent, CountryOfDocumentComponent ]
})
export class  DocumentModule {

}
