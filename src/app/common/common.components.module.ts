import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonPipesModule } from './common.pipes.module';

import { MainComponent } from './components/cards/main/main.component';
import { AppointmentComponent } from './components/cards/appointment/appointment.component';
import { AppointmentNotificationComponent } from './components/cards/appointment-notification/appointment-notification.component';
import { AppointmentSummaryComponent } from './components/appointment-summary/appointment-summary.component';
import { AppointmentScheduleComponent } from './components/appointment-schedule/appointment-schedule.component';
import { AppointmentContactInformationComponent } from './components/appointment-contact-information/appointment-contact-information.component';
import { AppointmentPaymentMethodComponent } from './components/appointment-payment-method/appointment-payment-method.component';
import { OtpHandlerComponent } from './components/otp-handler/otp-handler.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { AppointmentStatusComponent } from './components/appointment-status/appointment-status.component';
import { MapHandlerComponent } from './components/map-handler/map-handler.component';
import { MonthlyEarningsComponent } from './components/cards/monthly-earnings/monthly-earnings.component';
import { EarningsDetailComponent } from './components/cards/earnings-detail/earnings-detail.component';
import { RatingComponent } from './components/cards/rating/rating.component';
@NgModule({
    imports: [
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        CommonPipesModule
    ],
    declarations: [
        MainComponent,
        AppointmentComponent,
        AppointmentNotificationComponent,
        AppointmentSummaryComponent,
        AppointmentScheduleComponent,
        AppointmentContactInformationComponent,
        AppointmentPaymentMethodComponent,
        OtpHandlerComponent,
        LoadingSpinnerComponent,
        AppointmentStatusComponent,
        MapHandlerComponent,
        MonthlyEarningsComponent,
        EarningsDetailComponent,
        RatingComponent
    ],
    exports: [
        MainComponent,
        AppointmentComponent,
        AppointmentNotificationComponent,
        AppointmentSummaryComponent,
        AppointmentScheduleComponent,
        AppointmentContactInformationComponent,
        AppointmentPaymentMethodComponent,
        OtpHandlerComponent,
        LoadingSpinnerComponent,
        AppointmentStatusComponent,
        MapHandlerComponent,
        MonthlyEarningsComponent,
        EarningsDetailComponent,
        RatingComponent
    ],
})

export class CommonComponentsModule { }
