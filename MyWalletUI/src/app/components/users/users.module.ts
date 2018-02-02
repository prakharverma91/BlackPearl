import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {DataTableModule,SharedModule} from 'primeng/primeng';
import { UsersComponent } from './users.component';
import { UsersRoutes } from './users.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(UsersRoutes), DataTableModule, SharedModule,NgbModule],
  declarations: [UsersComponent]
})
export class UsersModule {

}
