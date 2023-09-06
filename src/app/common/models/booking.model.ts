import { Deserializable } from './deserializable.model';

export class Booking implements Deserializable {
    public id: string;
    public email: string;
    public fullname: string;
    public phone: string;
    public exactAddress: string;
    public bookingAddress: any;

    deserialize(input: any): this {
      // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
      return Object.assign(this, input);

    }
}
