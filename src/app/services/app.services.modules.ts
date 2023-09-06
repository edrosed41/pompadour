import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AuthguardService } from './authguard/authguard.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { OtpService } from './otp/otp.service';
import { AppointmentService  } from './appointment/appointment.service';
import { ProductsAndServicesService } from './products-and-services/products-and-services.service';
import { NotificationService } from './notification/notification.service';

@NgModule({
    imports: [
        IonicModule
    ],
    providers: [
        AuthguardService,
        AuthService,
        UserService,
        OtpService,
        AppointmentService,
        ProductsAndServicesService,
        NotificationService
    ]
})

export class AppServicesModule { }
