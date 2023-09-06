import { Deserializable } from './deserializable.model';

export class Account implements Deserializable {
    id: string;
    dateCreated: string;
    dateModified: string;
    dateDeleted: string;
    createdBy: string;
    modifiedBy: string;
    deletedBy: string;
    status: string;
    userName: string;
    mobileNumber: string;
    emailAddress: string;
    password: string;
    confirmationCode: string;
    confirmationExpiry: string;
    lockOutEnable: boolean;
    lockOutEndate: string;
    lastLogIn: string;
    lastLogOut: string;
    accessFailedCount: number;
    isOTPConfirmed: boolean;
    isAccountConfirmed: boolean;
    isFirstLogin: boolean;
    isDeactivated: boolean;
    isDeleted: boolean;
    latitude: string;
    longitude: string;
    personId: string;
    projectId: string;
    roleId: number;

    deserialize(input: any): this {
      // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
      return Object.assign(this, input);

    }
}

export enum AccountStatus {
  PENDING = 'Pending',
  APPROVED = 'Active',
  BLOCKED = 'Blocked'
}
