import { Deserializable } from './deserializable.model';
import { NavigationExtras } from '@angular/router';

export class ToastModel implements Deserializable {
    public message: string;
    public duration: number;
    public position: ToastPosition;
    public color: string;
    public cssClass: string;
    public navigationExtras: NavigationExtras;
    deserialize(input: any): this {
      // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
      return Object.assign(this, input);

    }
}

export enum ToastPosition {
    TOP = 'top',
    BOTTOM = 'bottom',
    MIDDLE = 'middle'
}
