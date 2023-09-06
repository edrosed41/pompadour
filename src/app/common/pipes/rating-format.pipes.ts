import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ratingformat'
})

export class RatingFormatPipe implements PipeTransform {
    transform(value: any): number {
        // console.log(value);
        if (Number.isInteger(value)) {
            return Math.round(value * 10) / 10;
        } else {
            return Math.round(+value * 10) / 10;
        }
    }
}
