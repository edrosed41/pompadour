import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtpValidatorPageRoutingModule } from './otp-validator-routing.module';

import { OtpValidatorPage } from './otp-validator.page';

import { CommonComponentsModule } from 'src/app/common/common.components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    OtpValidatorPageRoutingModule,
    CommonComponentsModule
  ],
  declarations: [OtpValidatorPage]
})
export class OtpValidatorPageModule {}
