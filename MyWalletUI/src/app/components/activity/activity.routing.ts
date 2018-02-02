import { Routes } from '@angular/router';

import { ActivityComponent } from './activity.component';

export const ActivitiesRoutes: Routes = [{
  path: '',
  component: ActivityComponent,
  data: {
    heading: 'Activity'
  }
}];
