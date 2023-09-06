import { Deserializable } from './deserializable.model';

export class Package implements Deserializable {
    public packageId: string;
    public packageName: string;
    public amount: number;
    public remarks: string;
    public details: any;

    deserialize(input: any): this {
      // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
      return Object.assign(this, input);

    }
}

export class Detail implements Deserializable {
    public feesChargeId: string;
    public feesChargeName: string;
    public uoM: string;
    public amount: number;
    public remarks: string;

    deserialize(input: any): this {
        // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
        return Object.assign(this, input);
    }
}
