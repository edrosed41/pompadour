import { Deserializable } from './deserializable.model';

export class AppointmentCard implements Deserializable {
    public clientName: string;
    public bookingAddress: string;
    public bookingDate: string;
    public amount: any;
    public duration: any;
    public serviceName: string;

    deserialize(input: any): this {
      return Object.assign(this, input);
    }
}
