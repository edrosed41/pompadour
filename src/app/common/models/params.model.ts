import { Deserializable } from './deserializable.model';

export class UserRegisterParams implements Deserializable {
    mobileNumber: string;
    userName: string;
    password: string;
    firstName: string;
    middleName: string;
    emailAddress: string;
    lastName: string;
    roleId: number;

    deserialize(input: any): this {
      return Object.assign(this, input);
    }
}
