import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VerificationRoutes } from './verification.routing';
import { AgencyComponent } from './agency/agency.component';
import { RequestComponent } from './request/request.component';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ToastModule} from 'ng2-toastr/ng2-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(VerificationRoutes),
    FormsModule,
    ReactiveFormsModule,
	NgbModule,
	DataTableModule,
	SharedModule,
	ToastModule.forRoot(),
  ],
  declarations: [AgencyComponent, RequestComponent]
})

export class VerificationModule {}
