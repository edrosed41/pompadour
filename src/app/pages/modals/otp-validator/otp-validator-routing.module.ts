import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtpValidatorPage } from './otp-validator.page';

const routes: Routes = [
  {
    path: '',
    component: OtpValidatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtpValidatorPageRoutingModule {}
