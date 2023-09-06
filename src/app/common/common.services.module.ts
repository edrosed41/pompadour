import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { LoadingService } from './services/loading/loading.service';
import { NetworkCheckService } from './services/network-check/network-check.service';

@NgModule({
    imports: [
        IonicModule
    ],
    providers: [
        LoadingService,
        NetworkCheckService,
    ]
})

export class CommonServicesModule { }
