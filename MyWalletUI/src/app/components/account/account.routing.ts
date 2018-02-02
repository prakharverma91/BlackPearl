import { Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ChangepasswordComponent } from './change-password/changepassword.component';
import { DocumentComponent } from './document/document.component';

export const AccountRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'profile',
      component: ProfileComponent
    },{
      path: 'changepassword',
      component: ChangepasswordComponent
    },{
      path: 'document',
      component: DocumentComponent
    }
  ]
  }
];
