import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { SignupRoutes } from './signup.routing';

@NgModule({
  imports: [
	CommonModule, 
	RouterModule.forChild(SignupRoutes),
	FormsModule,
    ReactiveFormsModule
	],
  declarations: [SignupComponent]
})

export class SignupModule {}
