import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {DataTableModule,SharedModule} from 'primeng/primeng';
import { RoleComponent } from './role.component';
import { RoleRoutes } from './role.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(RoleRoutes), DataTableModule, SharedModule,NgbModule,FormsModule,
    ReactiveFormsModule,AngularMultiSelectModule, MultiselectDropdownModule,],
  declarations: [RoleComponent]
})
export class RoleModule {

}
