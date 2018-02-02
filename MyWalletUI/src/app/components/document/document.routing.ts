import { Routes } from '@angular/router';
import {ListOfDocumentComponent } from './list-of-document/list-of-document.component';
import { MetaDocumentComponent } from './meta-document/meta-document.component';
import { CountryOfDocumentComponent } from './country-of-document/country-of-document.component';
export const DocumentRoutes: Routes = [
   {
    path: '',
	children: [{
      path: 'list-of-document',
      component: ListOfDocumentComponent
    },{
      path:'country-of-document',
       component: CountryOfDocumentComponent
    }
    ,{
      path: 'meta-document',
      component: MetaDocumentComponent 
    }]
  }
];