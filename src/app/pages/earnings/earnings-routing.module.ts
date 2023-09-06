import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EarningsPage } from './earnings.page';

const routes: Routes = [
  {
    path: '',
    component: EarningsPage
  },
  {
    path: 'monthly-details',
    loadChildren: () => import('./monthly-details/monthly-details.module').then( m => m.MonthlyDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EarningsPageRoutingModule {}
