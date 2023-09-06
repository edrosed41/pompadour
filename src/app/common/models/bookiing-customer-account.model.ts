import { Deserializable } from './deserializable.model';

export class BookingCustomerAccount implements Deserializable {
    public email: string;
    public fullName: string;
    public mobileNumber: any;
    public address: any;
    public addressDetail: any;
    public notes: any;

    deserialize(input: any): this {
      // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
      return Object.assign(this, input);

    }
}
