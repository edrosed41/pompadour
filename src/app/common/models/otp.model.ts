import { Deserializable } from './deserializable.model';

export class OTPRequest implements Deserializable {
    otpCode: string;
    mobileNumber: string;

    deserialize(input: any): this {
      return Object.assign(this, input);
    }
}

export class OTPResponse implements Deserializable {
    validOTP: boolean;
    type: ResponseType;
    message: string;

    deserialize(input: any): this {
      return Object.assign(this, input);
    }
}

export enum ResponseType {
  ERROR,
  SUCCESS
}
