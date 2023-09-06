import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonthlyDetailsPage } from './monthly-details.page';

const routes: Routes = [
  {
    path: '',
    component: MonthlyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonthlyDetailsPageRoutingModule {}
