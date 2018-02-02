import { Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { EmailVerificationComponent } from './emailverification/emailverification.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [{
      path: '',
      component: SigninComponent
    }, {
      path: 'signup',
      component: SignupComponent
    }, {
      path: 'emailverify',
      component: EmailVerificationComponent
    },
    {
      path: 'welcome',
      component: WelcomeComponent
    },
    {
      path: 'forgot',
      component: ForgotComponent
    }]
  }
];
