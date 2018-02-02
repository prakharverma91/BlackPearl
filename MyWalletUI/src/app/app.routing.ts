import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './components/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth/auth-layout.component';

export const AppRoutes: Routes = [
  {
  path: '',
  component: AuthLayoutComponent,
  children: [{
    path: '',
    loadChildren: './components/authentication/authentication.module#AuthenticationModule'
  }, {
    path: 'error',
    loadChildren: './components/error/error.module#ErrorModule'
  }]
  
},{
  path: '',
  component: AdminLayoutComponent,
  children: [{
    path: '',
    loadChildren: './components/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'role',
    loadChildren: './components/role/role.module#RoleModule'
  },
  {
    path: 'users',
    loadChildren: './components/users/users.module#UsersModule'
  },
  {
    path: 'action',
    loadChildren: './components/activity/activity.module#ActivitiesModule'
  },
  {
    path: 'account',
    loadChildren: './components/account/account.module#AccountModule'
   },
  // {
  //   path: 'node-info',
  //   loadChildren: './components/node-info/node-info.module#NodeInfoModule'
  // },
  {
    path: 'document',
    loadChildren: './components/document/document.module#DocumentModule'
  },
  
  {
    path: 'verification',
    loadChildren: './components/verification/verification.module#VerificationModule'
  }]
},  {
  path: '**',
  redirectTo: 'error/404'
}];



