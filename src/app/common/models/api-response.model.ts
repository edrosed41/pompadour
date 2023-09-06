import { Deserializable } from './deserializable.model';

export class APIResponse implements Deserializable {
    public resultEnum: number;
    public resultMessage: string;
    public resultObject: any;

    deserialize(input: any): this {
      // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
      return Object.assign(this, input);

    }
}
