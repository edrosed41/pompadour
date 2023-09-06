

import { Deserializable } from './deserializable.model';
import { AccountStatus } from './account.model';

export class User implements Deserializable {
    accountStatus: AccountStatus;
    address1: string;
    address2: string;
    barangay: string;
    cityMunicipality: string;
    civilStatus: string;
    dateBirth: string;
    emailAddress: string;
    firstName: string;
    fullName: string;
    gender: string;
    imagePath: string;
    lastName: string;
    latitude: string;
    longitude: string;
    middleName: string;
    mobileNumber: string;
    nationality: string;
    password: string;
    placeBirth: string;
    prefix: string;
    province: string;
    region: string;
    roleId: number;
    suffix: string;
    telNo: string;
    userId: string;
    userName: string;
    zipCode: string;
    rating: number;
    totalEarnings: number;

    deserialize(input: any): this {
      return Object.assign(this, input);
    }
}
