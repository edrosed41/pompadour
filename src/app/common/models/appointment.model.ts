import { Deserializable } from './deserializable.model';
import { Service } from './service.model';
import { Detail } from './package.model';
import { AppointmentCard } from './appointment-card.model';

export class Appointment implements Deserializable {
    public id: number;
    public bookingId: any;
    public serviceProviderId: any;
    public serviceProvider: any;
    public clientId: any;
    public client: any;
    public referenceNo: any;
    public date: any;
    public time: any;
    public latitude: any;
    public longitude: any;
    public address: any;
    public fees: any;
    public remarks: any;
    public bookingDetails: any;
    public detail: Detail[];
    public status: AppointmentStatus;
    public statusCode: AppointmentStatusCode;
    public serviceOfferedId: string;
    public serviceSelected: Service;
    public providerName: string;
    public clientName: string;
    public location: any;
    public addressDetail: any;
    public notes: any;
    public bookingDateTime: any;
    public duration: any;
    public appointmentCard: AppointmentCard;
    public contactno: string;
    public emailAddress: string;
    public isPast: boolean;

    deserialize(input: any): this {
      // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
      return Object.assign(this, input);

    }
}

export enum AppointmentStatus {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  ON_THE_WAY = 'On the way',
  ARRIVED = 'Arrived',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed',
  RESERVED = 'Reserved',
  REJECTED = 'Rejected'
}

export enum AppointmentStatusCode {
  PENDING = '1',
  ACCEPTED = '3',
  ON_THE_WAY = '5',
  ARRIVED = '6',
  IN_PROGRESS = '7',
  COMPLETED = '8',
  RESERVED = '2',
  REJECTED = '4'
}
