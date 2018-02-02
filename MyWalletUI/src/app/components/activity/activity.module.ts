import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import { ActivityComponent } from './activity.component';
import { ActivitiesRoutes } from './activity.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ActivitiesRoutes), DataTableModule, SharedModule,NgbModule],
  declarations: [ActivityComponent]
})
export class ActivitiesModule {

}
