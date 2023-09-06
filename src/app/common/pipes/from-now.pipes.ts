import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'fromNow'
})

export class FromNowPipe implements PipeTransform {
    transform(dateTime: any): string {
        return moment(dateTime).fromNow();
    }
}
