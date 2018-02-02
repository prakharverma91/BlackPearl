import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountRoutes } from './account.routing';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import { ProfileComponent } from './profile/profile.component';
import { ChangepasswordComponent } from './change-password/changepassword.component';
import { ProfilepicComponent } from './profile-pic/profilepic.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { DocumentComponent } from './document/document.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AccountRoutes),
    FormsModule,
    ReactiveFormsModule,
	NgbModule,
	DataTableModule,
	SharedModule,
	ToastModule.forRoot(),Ng2CarouselamosModule
  ],
  declarations: [ProfileComponent, ChangepasswordComponent, ProfilepicComponent,DocumentComponent]
})


export class AccountModule {


}
