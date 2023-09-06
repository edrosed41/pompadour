import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { FromNowPipe } from './pipes/from-now.pipes';
import { StringCurrencyPipe } from './pipes/string-currency.pipes';
import { BookingStatusStringPipe } from './pipes/booking-status-string.pipes';
import { RatingFormatPipe } from './pipes/rating-format.pipes';

@NgModule({
    imports: [
        IonicModule,
    ],
    declarations: [
        FromNowPipe,
        StringCurrencyPipe,
        BookingStatusStringPipe,
        RatingFormatPipe
    ],
    exports: [
        FromNowPipe,
        StringCurrencyPipe,
        BookingStatusStringPipe,
        RatingFormatPipe
    ],
})
export class CommonPipesModule { }
