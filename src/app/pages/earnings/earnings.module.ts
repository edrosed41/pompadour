import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EarningsPageRoutingModule } from './earnings-routing.module';

import { EarningsPage } from './earnings.page';

import { CommonPipesModule } from 'src/app/common/common.pipes.module';
import {CommonComponentsModule} from 'src/app/common/common.components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EarningsPageRoutingModule,
    CommonPipesModule,
    CommonComponentsModule
  ],
  declarations: [EarningsPage]
})
export class EarningsPageModule {}
