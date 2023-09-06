import { Deserializable } from './deserializable.model';

export class Notification implements Deserializable {
    public id: number;
    public devices: [any];
    public title: string;
    public body: string;
    public contentAvailable: string;
    public badgeCounter: string;
    public bookingId: string;
    public notificationStatusId: number;
    public notificationTypeId: number;
    public message: string;
    public dateCreated: string;
    public sender: string;
    public receiver: string;
    public priority: string;
    public isRead: boolean;
    public status: NotificationStatus;

    deserialize(input: any): this {
      // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
      return Object.assign(this, input);

    }
}

export enum NotificationStatus {
  ACTIVE = 'Active',
  READ = 'Read',
}
