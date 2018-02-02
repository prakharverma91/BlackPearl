import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { CommonModule } from '@angular/common';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SidebarModule } from 'ng-sidebar';
import { AppRoutes } from './app.routing';
import { AppComponent } from './components/app.component';
import { AdminLayoutComponent } from './components/layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './components/layouts/auth/auth-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import { SharedModule } from './components/shared/shared.module';
import { CommonService } from './services/common.service';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
// custom-option.ts
import {ToastOptions} from 'ng2-toastr';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
// import { NodeInfoComponent } from './components/node-info/node-info.component';
// import { ListOfDocumentComponent } from './components/document/list-of-document/list-of-document.component';
// import { MetaDocumentComponent } from './components/document/meta-document/meta-document.component';

/* import { UserComponent } from './components/forging/users/users.component'; 
import {DataTableModule, CalendarModule} from 'primeng/primeng';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
declare var require: any;

export function highchartsFactory() {
      const hc = require('highcharts');
      const dd = require('highcharts/modules/drilldown');
      dd(hc);

      return hc;
}*/

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    
   
	/* DashboardComponent,
	SidebarComponent */
  ],
  imports: [
    BrowserModule,CommonModule,
    BrowserAnimationsModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    FormsModule,
    HttpModule,
    AngularMultiSelectModule,
  ToastModule.forRoot(),
  
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    NgbModule.forRoot(),
    SidebarModule.forRoot(),
	/* DataTableModule, 
	CalendarModule,
	ChartModule */
  ],
  providers:[
    CommonService,
    // {provide: ToastOptions, useClass: CustomOption}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

