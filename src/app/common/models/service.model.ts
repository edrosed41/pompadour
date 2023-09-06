import { Deserializable } from './deserializable.model';
import { Package } from './package.model';

export class Service implements Deserializable {
    public id: any;
    public serviceOfferedId: string;
    public packageId: string;
    public userId: string;
    public description: string;
    public remarks: string;
    public dateCreated: string;
    public dateModified: string;
    public createdBy: string;
    public modifiedBy: string;
    public deletedBy: string;
    public status: string;
    public amount: string;
    public package: Package;
    public duration: string;

    deserialize(input: any): this {
      // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
      return Object.assign(this, input);

    }
}
