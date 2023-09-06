import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'stringcurrency'
})

export class StringCurrencyPipe implements PipeTransform {
    transform(value: any): string {
        if (Number.isInteger(value)) {
            const newVal = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            return 'PHP ' + newVal + '.00';
        }
        return value;
    }
}
