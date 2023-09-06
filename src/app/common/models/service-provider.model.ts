import { Deserializable } from './deserializable.model';
import { Service } from './service.model';
import { AccountStatus } from './account.model';

export class ServiceProvider implements Deserializable {
  // public id: number;
  // public fullname: string;
  // public organization: string;
  // public rating: number;
  // public image: string;
  // public services: Service[];
  // public location: any;
  // public distance: any;

  public accountStatus: AccountStatus;
  public address1: string;
  public address2: string;
  public barangay: string;
  public cityMunicipality: string;
  public civilStatus: string;
  public dateBirth: string;
  public emailAddress: string;
  public firstName: string;
  public fullName: string;
  public gender: string;
  public imagePath: string;
  public lastName: string;
  public latitude: string;
  public longitude: string;
  public middleName: string;
  public mobileNumber: string;
  public nationality: string;
  public password: string;
  public placeBirth: string;
  public prefix: string;
  public province: string;
  public region: string;
  public roleId: number;
  public suffix: string;
  public telNo: string;
  public userId: string;
  public userName: string;
  public zipCode: string;

  public distance: any;
  public rating: number;
  public services: Service[];

  public organization: string;
  public image: string;

  deserialize(input: any): this {
    // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
    Object.assign(this, input);

    // Iterate over all cars for our user and map them to a proper `Car` model
    // this.cars = input.cars.map(car => new Car().deserialize(car));

    return this;
  }

//   getFullName() {
//     return this.firstName + ' ' + this.lastName;
//   }
}

