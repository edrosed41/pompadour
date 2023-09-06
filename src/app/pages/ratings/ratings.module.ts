import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatingsPageRoutingModule } from './ratings-routing.module';

import { RatingsPage } from './ratings.page';
import { CommonPipesModule } from 'src/app/common/common.pipes.module';
import { CommonComponentsModule } from 'src/app/common/common.components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatingsPageRoutingModule,
    CommonPipesModule,
    CommonComponentsModule
  ],
  declarations: [RatingsPage]
})
export class RatingsPageModule {}
