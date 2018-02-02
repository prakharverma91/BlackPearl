import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationRoutes } from './authentication.routing';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { EmailVerificationComponent } from './emailverification/emailverification.component';
import { headerComponent } from './header/header.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {CaptchaModule} from 'primeng/primeng';
import { WelcomeComponent } from './welcome/welcome.component';
// import { roleComponent } from './role/role.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    FormsModule,
    ReactiveFormsModule,
	NgbModule,
	ToastModule.forRoot(),
	CaptchaModule
  ],
  declarations: [SigninComponent, SignupComponent, ForgotComponent, EmailVerificationComponent, headerComponent, WelcomeComponent]
})

export class AuthenticationModule {}
