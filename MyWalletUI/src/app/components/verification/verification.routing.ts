import { Routes } from '@angular/router';
import { AgencyComponent } from './agency/agency.component';
import { RequestComponent } from './request/request.component';

export const VerificationRoutes: Routes = [
  {
    path: '',
	children: [{
      path: 'agency',
      component: AgencyComponent
    },{
      path: 'request',
      component: RequestComponent
    }]
  }
];
