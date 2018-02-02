import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {DataTableModule,SharedModule, CalendarModule} from 'primeng/primeng';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
declare var require: any;

export function highchartsFactory() {
      const hc = require('highcharts');
      const dd = require('highcharts/modules/drilldown');
      dd(hc);

      return hc;
}

@NgModule({
  imports: [CommonModule, RouterModule.forChild(DashboardRoutes), NgxChartsModule, DataTableModule, FormsModule, CalendarModule, SharedModule,NgbModule, ChartModule],
  declarations: [DashboardComponent],
  providers:[{
	provide: HighchartsStatic,
	useFactory: highchartsFactory
	}]
})
export class DashboardModule {

}
